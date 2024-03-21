import { gql } from '@apollo/client';

export const GET_ALL_NFTS = gql`
  query {
    nfts {
      id
      tokenId
      tokenURI
      owner
      competenceId
      competenceLevel
    }
  }
`;

export const GET_NFTS_BY_STUDENT_ADDRESS = gql`
  query GetNFTsByStudentAddress($studentAddress: String!) {
    nfts(studentAddress: $studentAddress) {
      id
      tokenId
      tokenURI
      owner
      competenceId
      competenceLevel
    }
  }
`;

export const GET_NFTS_BY_COMPETENCE_NAME = gql`
  query GetNFTsByCompetenceName($competenceName: String!) {
    nfts(competenceName: $competenceName) {
      id
      tokenId
      tokenURI
      owner
      competenceId
      competenceLevel
    }
  }
`;

//probni query:
export const GET_NFTS = gql`
  query {
    nfts(studentAddress: "0x2ba9e53f3C8c0bCB39262d0bB569d8833f5288b7") {
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
