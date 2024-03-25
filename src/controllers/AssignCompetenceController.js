import axios from "axios";
import SoulboundNFT from "../contracts/SoulboundNFT.json";
import { getAllNFTs } from "../requests/NFTRequest";
const JWT = process.env.REACT_APP_JWT;
const contractAddress = SoulboundNFT.contractAddress;

const uploadToIpfs = async (comp) => {
  const compLevel = comp.competenceLevel;
  let imageUrl;
  console.log("competence lvl in uploadToIpfs: ", compLevel);
  switch (compLevel) {
    case 1:
      imageUrl = "ipfs/QmWoKxEKSX9qLaMhBR9HnHF8wdP4QyxtjEuRBy58965Qgy";
      console.log("lvl1- purple");
      break;
    case 2:
      imageUrl = "ipfs/QmXKnqDyJfurosNKDcvT5djer4BLbHVL5PUrFYJq2a5DTA";
      console.log("lvl2 - blue");
      break;
    case 3:
      imageUrl = "ipfs/QmQ2iY7YCohoqKmfobJjAq4JQtpnqrGtJi5vAr3gqaDdna";
      console.log("lvl3 - teal");
      break;
    case 4:
      imageUrl = "ipfs/QmRsm9s87oPwcsyNzQ4mKVwLDE8pdJhiKjZ6XL9xj3XikU";
      console.log("lvl4 - rose gold");
      break;
    case 5:
      imageUrl = "ipfs/QmbKEVQLBpPDySD5saNbE7gewPZfDyxcgVc2Xi3VzGPXmh";
      console.log("lvl5 - silver");
      break;
    case 6:
      imageUrl = "ipfs/QmbBrmSvN3Q7DHpwvXKj5xENe45xn587vb8G74nrHJSRo7";
      console.log("lvl6 - golden");
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
    return res.data.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};

export const assignCompetences = async (
  comp,
  web3,
  allData,
  setSearchLoading,
  setShowErrorModal,
  setDataToShow,
  client
) => {
  console.log("assignCompetences");
  const studentCompetences = allData.nfts.filter((data) => {
    return data.competenceId === 0 && data.owner === comp.metamaskAccount;
  });
  const activeTransactions = [];
  let maxLevel;
  if (!studentCompetences.length) {
    maxLevel = 0;
    console.log("studentCompetences nema");
  } else {
    maxLevel = studentCompetences.reduce(
      (max, obj) => Math.max(max, obj.competenceLevel),
      -Infinity
    );
    console.log("studentCompetences ima");
  }
  setSearchLoading(true);
  for (let i = maxLevel + 1; i <= comp.competenceLevel; i++) {
    if (i === comp.competenceLevel) {
      console.log("dodeljivanje najveceg nivoa");
      await assignCompetence(comp, web3, activeTransactions);
    } else {
      console.log(`dodeljivanje nivoa ${i}`);
      const dummyComp = structuredClone(comp);
      dummyComp.competenceLevel = i;
      for (let key in dummyComp.competence.elements) {
        dummyComp.competence.elements[key] = "NA";
      }
      console.log("dummy: ", dummyComp);
      await assignCompetence(dummyComp, web3, activeTransactions);
    }
  }
  const interval = setInterval(async () => {
    console.log("active transactions: ", activeTransactions);
    let allFinished = activeTransactions.every((obj) => obj.finished === true);
    let hasError = activeTransactions.some((obj) => obj.error === true);
    console.log("setInterval");
    console.log("all finished: ", allFinished);
    console.log("has error: ", hasError);
    if (allFinished) {
      clearInterval(interval);
      console.log("svi su prosli uzimamo query");
      window.location.reload();
    }

    if (hasError) {
      setShowErrorModal(true);
      clearInterval(interval);
      console.log("ima error uzimamo query");
      window.location.reload();
    }
  }, 2000);
};

async function assignCompetence(comp, web3, activeTransactions) {
  console.log("assigncompetence");
  if (comp.competenceLevel && comp.metamaskAccount && web3) {
    const tokenURI = await uploadToIpfs(comp);
    console.log(tokenURI);
    const account = sessionStorage.getItem("eth_account");
    console.log("eth_account in assignCompetence: ", account);
    const txHash = await mintNFT(comp, tokenURI, account, web3);
    console.log("hash: ", txHash);
    if (txHash) {
      activeTransactions.push({ id: txHash, finished: false, error: false });
      const interval = setInterval(async () => {
        try {
          const receipt = await window.ethereum.request({
            method: "eth_getTransactionReceipt",
            params: [txHash],
          });
          console.log("Receipt: ", receipt, " za tx: ", txHash);
          if (receipt && receipt.blockNumber) {
            const transaction = activeTransactions.find(
              (obj) => obj.id === txHash
            );
            transaction.finished = true;
            clearInterval(interval);
            console.log("transaction finished");
          }
        } catch (error) {
          console.log(error);
        }
      }, 3000);
    }
  }
}

async function mintNFT(comp, tokenURI, account, web3) {
  console.log("mintNFT");
  if (tokenURI && account) {
    try {
      const contract = new web3.eth.Contract(SoulboundNFT.abi, contractAddress);

      const transactionParameters = {
        to: contractAddress,
        from: account,
        data: contract.methods
          .mintNFT(tokenURI, comp.metamaskAccount, 0, comp.competenceLevel)
          .encodeABI(),
      };

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      console.log("Transaction hash: ", txHash);
      return txHash;
    } catch (error) {
      console.log("Error sending transaction: ", error);
      return null;
    }
  }
}
