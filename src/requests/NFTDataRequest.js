import axios from "axios";

export const fetchNftData = async (loading, error, nft, setCompData) => {
  if (!loading && !error) {
    const tokenURI = nft.tokenURI;
    axios
      .get(
        `https://lavender-familiar-cobra-609.mypinata.cloud/ipfs/${tokenURI}`
      )
      .then((response) => {
        setCompData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching NFT data:", error);
      });
  }
};

export const fetchAllNftData = async (error, data) => {
  let nftsData = [];
  try {
    if (!error) {
      const promises = data.nfts.map(async (nft) => {
        const tokenURI = nft.tokenURI;
        try {
          const response = await axios.get(
            `https://lavender-familiar-cobra-609.mypinata.cloud/ipfs/${tokenURI}`
          );
          nftsData.push(response.data);
        } catch (error) {
          console.error("Error fetching NFT data:", error);
        }
      });
      await Promise.all(promises);
    }
  } catch (error) {
    console.error("Error fetching NFT data:", error);
  }

  return nftsData;
};
