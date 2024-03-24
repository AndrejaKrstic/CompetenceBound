const SoulboundNFT = require('../contracts/SoulboundNFT.json');
const { ApolloServer, gql } = require('apollo-server');
const { ethers } = require('ethers');

const contractABI = SoulboundNFT.abi;
const contractAddress = SoulboundNFT.contractAddress;

const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/e2d17050f550446dad42f6bab853f289");
const contract = new ethers.Contract(contractAddress, contractABI, provider);

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
      const totalTokens = await contract.getCurrentToken();

      const nfts = [];
      for (let i = 0; i < totalTokens; i++) {
        const tokenURI = await contract.tokenURI(i);
        const owner = await contract.ownerOf(i);
        const competences = await contract.competences(i);
        const competenceId = competences.competenceId.toNumber(); 
        const competenceLevel = competences.competenceLevel;
        const competenceNameForToken = await contract.competencesName(competenceId);
        
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
      const filter = contract.filters.CompetenceAssigned(null, null, studentAddress, competenceName, null);
      const events = await contract.queryFilter(filter);

      return events.map(event => ({
        tokenURI: event.args.tokenURI,
        tokenId: event.args.tokenId.toNumber(),
        studentAddress: event.args.studentAddress,
        competenceName: event.args.competenceName,
        competenceLevel: event.args.competenceLevel,
      }));
    },
    competenceAddedEvents: async () => {
      const filter = contract.filters.CompetenceAdded(null, null);
      const events = await contract.queryFilter(filter);

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
