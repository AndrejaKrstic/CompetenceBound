import { useApolloClient } from "@apollo/client";
import {
  GET_NFTS_BY_STUDENT_ADDRESS,
  GET_NFTS_BY_COMPETENCE_NAME,
  GET_ALL_NFTS,
  GET_NFTS_BY_COMPETENCE_AND_STUDENT,
} from "../graphql/Queries";

export const getAllNFTs = (
  client,
  setSearchLoading,
  setDataToShow,
  setShowErrorModal
) => {
  setSearchLoading(true);
  client
    .query({
      query: GET_ALL_NFTS,
    })
    .then(({ data }) => {
      setSearchLoading(false);
      setDataToShow(data);
    })
    .catch((error) => {
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
      }, 3000);
      setSearchLoading(false);
    });
};

export const getNFTsByCompetenceName = (
  client,
  setSearchLoading,
  setDataToShow,
  setShowErrorModal,
  searchTerm
) => {
  setSearchLoading(true);
  client
    .query({
      query: GET_NFTS_BY_COMPETENCE_NAME,
      variables: { competenceName: searchTerm },
    })
    .then(({ data }) => {
      setSearchLoading(false);
      setDataToShow(data);
      console.log(data);
    })
    .catch((error) => {
      setSearchLoading(false);
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
      }, 3000);
    });
};

export const getNFTSByStudentAdress = (
  client,
  setSearchLoading,
  setDataToShow,
  setShowErrorModal,
  studentAddress
) => {
  setSearchLoading(true);
  client
    .query({
      query: GET_NFTS_BY_STUDENT_ADDRESS,
      variables: {
        studentAddress: studentAddress,
      },
    })
    .then(({ data }) => {
      setSearchLoading(false);
      setDataToShow(data);
    })
    .catch((error) => {
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
      }, 3000);
      setSearchLoading(false);
    });
};

export const getNFTSByStudentAndCompetence = (
  client,
  setSearchLoading,
  setDataToShow,
  setShowErrorModal,
  competenceName,
  studentAdress
) => {
  setSearchLoading(true);
  client
    .query({
      query: GET_NFTS_BY_COMPETENCE_AND_STUDENT,
      variables: {
        competenceName: competenceName,
        studentAddress: studentAdress,
      },
    })
    .then(({ data }) => {
      setSearchLoading(false);
      setDataToShow(data);
    })
    .catch((error) => {
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
      }, 3000);
      setSearchLoading(false);
    });
};
