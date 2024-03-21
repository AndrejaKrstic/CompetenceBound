import axios from "axios";
const JWT = process.env.REACT_APP_JWT;

const uploadToIpfs = async (comp) => {
  const compLevel = comp.competenceLevel;
  let imageUrl;
  switch (compLevel) {
    case 1:
      imageUrl = "ipfs/QmPS6jDAq9HejYYAQMYiXLFPnZSzbCy8jyWS2KbA7ZzxDh";
      console.log("ok");
      break;
    case 2:
      console.log("dada");
      break;
    case 3:
      console.log("nene");
      break;
    case 4:
      console.log("opa");
      break;
    case 5:
      console.log("cupa");
      break;
    case 6:
      console.log("supa");
      break;
    default:
      console.log("Invalid competence level");
  }

  const data = JSON.stringify({
    pinataContent: {
      name: comp.competence.name,
      description: comp.competence.description,
      external_url: "https://pinata.cloud",
      image: imageUrl,
      competenceLevel: comp.competenceLevel,
      studentName: `${comp.name} ${comp.surname}`,
      studentID: comp.studentId,
      studentAddress: comp.metamaskAccount,
      skills: comp.competence.elements,
      dispositions: comp.competence.dispositions,
    },
    pinataMetadata: {
      name: `${comp.competence.name}_${comp.name}_${comp.surname}.json`,
    },
  });
  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const assignCompetence = async (comp) => {
  // await uploadToIpfs(comp);
};
