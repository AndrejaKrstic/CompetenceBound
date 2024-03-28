import axios from "axios";
import SoulboundNFT from "../contracts/SoulboundNFT.json";
const JWT = process.env.REACT_APP_JWT;
const contractAddress = SoulboundNFT.contractAddress;

const uploadToIpfs = async (comp) => {
  const compLevel = comp.competenceLevel;
  let imageUrl;
  switch (compLevel) {
    case 1:
      imageUrl = "ipfs/QmWoKxEKSX9qLaMhBR9HnHF8wdP4QyxtjEuRBy58965Qgy";
      break;
    case 2:
      imageUrl = "ipfs/QmXKnqDyJfurosNKDcvT5djer4BLbHVL5PUrFYJq2a5DTA";
      break;
    case 3:
      imageUrl = "ipfs/QmQ2iY7YCohoqKmfobJjAq4JQtpnqrGtJi5vAr3gqaDdna";
      break;
    case 4:
      imageUrl = "ipfs/QmRsm9s87oPwcsyNzQ4mKVwLDE8pdJhiKjZ6XL9xj3XikU";
      break;
    case 5:
      imageUrl = "ipfs/QmbKEVQLBpPDySD5saNbE7gewPZfDyxcgVc2Xi3VzGPXmh";
      break;
    case 6:
      imageUrl = "ipfs/QmbBrmSvN3Q7DHpwvXKj5xENe45xn587vb8G74nrHJSRo7";
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
    return res.data.IpfsHash;
  } catch (error) {}
};

export const assignCompetences = async (
  comp,
  web3,
  allData,
  setSearchLoading,
  setShowErrorModal,
  showWarning
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
    if (maxLevel === comp.competenceLevel) {
      showWarning(
        `This student already has competence level ${comp.competenceLevel}`
      );
      return;
    }
    if (maxLevel > comp.competenceLevel) {
      showWarning(
        `This student already has competence level higher than ${comp.competenceLevel}`
      );
      return;
    }
  }
  setSearchLoading(true);
  for (let i = maxLevel + 1; i <= comp.competenceLevel; i++) {
    if (i === comp.competenceLevel) {
      await assignCompetence(
        comp,
        web3,
        activeTransactions,
        setShowErrorModal,
        setSearchLoading
      );
    } else {
      const dummyComp = structuredClone(comp);
      dummyComp.competenceLevel = i;
      for (let key in dummyComp.competence.elements) {
        dummyComp.competence.elements[key] = "NA";
      }
      await assignCompetence(
        dummyComp,
        web3,
        activeTransactions,
        setShowErrorModal,
        setSearchLoading
      );
    }
  }
  const interval = setInterval(async () => {
    let allFinished = activeTransactions.every((obj) => obj.finished === true);
    let hasError = activeTransactions.some((obj) => obj.error === true);
    if (allFinished && typeof allFinished === "boolean") {
      clearInterval(interval);
      window.location.reload();
    }

    if (hasError) {
      setShowErrorModal(true);
      clearInterval(interval);
      window.location.reload();
    }
  }, 2000);
};

async function assignCompetence(
  comp,
  web3,
  activeTransactions,
  setShowErrorModal,
  setSearchLoading
) {
  if (comp.competenceLevel && comp.metamaskAccount && web3) {
    const tokenURI = await uploadToIpfs(comp);
    const account = sessionStorage.getItem("eth_account");
    const txHash = await mintNFT(comp, tokenURI, account, web3);
    if (txHash) {
      activeTransactions.push({ id: txHash, finished: false, error: false });
      const interval = setInterval(async () => {
        try {
          const receipt = await window.ethereum.request({
            method: "eth_getTransactionReceipt",
            params: [txHash],
          });
          if (receipt && receipt.blockNumber) {
            const transaction = activeTransactions.find(
              (obj) => obj.id === txHash
            );
            transaction.finished = true;
            clearInterval(interval);
          }
        } catch (error) {
          setShowErrorModal(true);
        }
      }, 3000);
    } else {
      setSearchLoading(false);
      setShowErrorModal(true);
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
      return txHash;
    } catch (error) {
      return null;
    }
  }
}
