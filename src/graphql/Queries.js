import { gql } from '@apollo/client';

export const GET_NFTS = gql`
  query {
    nfts(studentAddress: "0x123456789abcdef123456789abcdef123456789a") {
      id
      tokenId
      tokenURI
      owner
      competenceId
      competenceLevel
    }
  }
`;

export const GET_COMPETENCE_ADDED_EVENTS = gql`
  query {
    competenceAddedEvents {
      competenceId
      competenceName
    }
  }
`;
