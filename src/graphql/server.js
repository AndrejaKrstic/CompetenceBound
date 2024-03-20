const SoulboundNFTNFTABI = require('../contracts/SoulboundNFT.json');
const { ApolloServer, gql } = require('apollo-server');
const { ethers } = require('ethers');

const contractABI = SoulboundNFTNFTABI.abi;
const contractAddress = "0xC1d2b725a73be07c60ca0eCe6F6F9e2F8511F476";

const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/e2d17050f550446dad42f6bab853f289");
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Define your GraphQL schema
const typeDefs = gql`
  type NFT {
  id: ID!
  tokenId: Int!
  tokenURI: String!
  owner: String!
  competenceId: Int!
  competenceLevel: Int!
}

type CompetenceAssignedEvent {
    tokenURI: String!
    tokenId: Int!
    studentAddress: String!
    competenceName: String!
    competenceLevel: Int!
  }

  type CompetenceAddedEvent {
    competenceName: String!
    competenceId: Int!
  }

type Query {
  nfts(studentAddress: String, competenceName: String): [NFT!]!
  competenceAssignedEvents(studentAddress: String, competenceName: String): [CompetenceAssignedEvent!]!
  competenceAddedEvents: [CompetenceAddedEvent!]!
}
`;
const resolvers = {
  Query: {
    nfts: async (_, { studentAddress, competenceName }) => {
      // Fetch all issued NFTs
      const totalTokens = await contract.getCurrentToken();

      // Iterate over all tokens and fetch metadata for each
      const nfts = [];
      for (let i = 0; i < totalTokens; i++) {
        const tokenURI = await contract.tokenURI(i);
        const owner = await contract.ownerOf(i);
        const { competenceId, competenceLevel } = await contract.competences(i);
        const competenceNameForToken = await contract.competencesName(competenceId);
        
        // Check if the competence name or student address matches the provided criteria
        if ((!competenceName || competenceNameForToken === competenceName) && 
            (!studentAddress || owner === studentAddress)) {
          nfts.push({
            id: i,
            tokenId: i,
            tokenURI,
            owner,
            competenceId,
            competenceLevel,
          });
        }
      }
      return nfts;
    },
    competenceAssignedEvents: async (_, { studentAddress, competenceName }) => {
      // Fetch historical CompetenceAssigned events from the blockchain
      const filter = contract.filters.CompetenceAssigned(null, null, studentAddress, competenceName, null);
      const events = await contract.queryFilter(filter);

      // Transform events into GraphQL-compatible format
      return events.map(event => ({
        tokenURI: event.args.tokenURI,
        tokenId: event.args.tokenId.toNumber(),
        studentAddress: event.args.studentAddress,
        competenceName: event.args.competenceName,
        competenceLevel: event.args.competenceLevel.toNumber(),
      }));
    },
    competenceAddedEvents: async () => {
      // Fetch historical CompetenceAdded events from the blockchain
      const filter = contract.filters.CompetenceAdded(null, null);
      const events = await contract.queryFilter(filter);

      // Transform events into GraphQL-compatible format
      return events.map(event => ({
        competenceName: event.args.competenceName,
        competenceId: event.args.competenceId.toNumber(),
      }));
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers, playground: true, });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
