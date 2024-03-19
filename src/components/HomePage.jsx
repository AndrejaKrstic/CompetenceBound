import React from "react";
import style from "./HomePage.module.css";
import axios from 'axios';
const JWT = ''

function HomePage() {

const uploadToIpfs = async () => {
  const data = JSON.stringify({
    pinataContent: {
      name: "Purple badge",
      description:
        "Digital badge for DApp Development competence with level B-III according to Revised Bloom's Skill List",
      external_url: "https://pinata.cloud",
      image: "ipfs/QmPS6jDAq9HejYYAQMYiXLFPnZSzbCy8jyWS2KbA7ZzxDh",
      competenceName: "DApp Development",
      competenceLevel: 3,
      studentName: "Darko Markovic",
      studentID: "179/18",
      studentAddress: "0xefef...",
      skills: [
        { "Smart Contract Development": 1 },
        { "UI Design": 5 },
        { "Testig and Debugging": 3 },
      ],
      dispositions: ["sa ciljem", "motivisano", "inventivno"],
    },
    pinataMetadata: {
      name: "metadata3.json",
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

  return (
    <div className={`container mt-5 ${style.homePageContainer}`}>
      <h1 className="text-start">Welcome to Name of the App</h1>
      <p className="text-start mt-3">Description of the App: bla bla truc</p>
      <hr className="divider mt-5 mb-4" />
      <div className="row mt-5">
        <div className="col text-start">
          <h3>Get Started</h3>
          <div className={`mt-3 ${style.buttonContainer}`}>
            <a className={style.blogButton} href="/blog">Check out some blog posts</a>
            <a className={style.compButton} href="/competences">Dive into competences</a>
          </div>
          <div>
            <button onClick={uploadToIpfs}>Upload to IPFS</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
