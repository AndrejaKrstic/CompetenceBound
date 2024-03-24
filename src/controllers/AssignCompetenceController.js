import axios from "axios";
import SoulboundNFT from "../contracts/SoulboundNFT.json";
import { data } from "jquery";
const JWT = process.env.REACT_APP_JWT;
const contractAddress = "0xC1d2b725a73be07c60ca0eCe6F6F9e2F8511F476";

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
  setShowErrorModal
) => {
  const studentCompetences = allData.nfts.filter((data) => {
    return data.competenceId === 0 && data.owner === comp.metamaskAccount;
  });
  const activeTransactions = [];
  let maxLevel;
  if (!studentCompetences.length) {
    maxLevel = 0;
  } else {
    maxLevel = studentCompetences.reduce(
      (max, obj) => Math.max(max, obj.competenceLevel),
      -Infinity
    );
  }
  setSearchLoading(true);
  for (let i = maxLevel + 1; i <= comp.competenceLevel; i++) {
    if (i === comp.competenceLevel) {
      await assignCompetence(comp, web3, activeTransactions);
    } else {
      const dummyComp = structuredClone(comp);
      dummyComp.competenceLevel = i;
      for (let key in dummyComp.competence.elements) {
        dummyComp.competence.elements[key] = "NA";
      }
      console.log(dummyComp);
      await assignCompetence(dummyComp, web3, activeTransactions);
    }
  }
  const interval = setInterval(async () => {
    let allFinished = activeTransactions.every((obj) => obj.finished === true);
    let hasError = activeTransactions.some((obj) => obj.error === true);

    if (allFinished) {
      setSearchLoading(false);
      clearInterval(interval);
    }

    if (hasError) {
      setSearchLoading(false);
      setShowErrorModal(true);
      clearInterval(interval);
    }
  }, 2000);
};

async function assignCompetence(comp, web3, activeTransactions) {
  if (comp.competenceLevel && comp.metamaskAccount && web3) {
    const tokenURI = await uploadToIpfs(comp);
    console.log(tokenURI);
    const account = sessionStorage.getItem("eth_account");
    console.log("eth_account in assignCompetence: ", account);
    const hash = await mintNFT(
      comp,
      tokenURI,
      account,
      web3,
      activeTransactions
    );
    if (hash) {
      activeTransactions.push({ id: hash, finished: false, error: false });
      const interval = setInterval(async () => {
        const receipt = await web3.eth.getTransactionReceipt(hash);
        if (receipt && receipt.blockNumber) {
          const transaction = activeTransactions.find((obj) => obj.id === hash);
          transaction.finished = true;
          clearInterval(interval);
        }
      }, 3000);
    } else {
      activeTransactions.push({ id: hash, finished: false, error: true });
    }
  }
}

async function mintNFT(comp, tokenURI, account, web3) {
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
