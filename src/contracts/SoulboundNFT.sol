// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.7.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.0/utils/Counters.sol";

contract SoulboundNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    
    struct Competence {
        uint256 competenceId;
        uint8 competenceLevel;
    }
    
    string[] public competencesName;
    mapping (uint256 => Competence) public competences;

    event CompetenceAssigned(string tokenURI, uint256 tokenId, address studentAddress, string competenceName, uint8 competenceLevel); //tokenuri, student address
    event CompetenceAdded(string competenceName,  uint256 competenceId);

    constructor() ERC721("SoulboundNFT", "SBNFT") {}

    function mintNFT(string memory _tokenURI, address _to, uint256 competenceId, uint8 competenceLevel) public onlyOwner {
         require(competenceId < competencesName.length, "Competence ID out of range");
        
         uint256 tokenId = _tokenIdCounter.current();
        _mint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        competences[tokenId] = Competence(competenceId, competenceLevel);
        _tokenIdCounter.increment();

        emit CompetenceAssigned(_tokenURI, tokenId, _to, competencesName[competenceId], competenceLevel);
    }

    function addCompetence(string memory name) public {
         uint256 index = competencesName.length; 
        competencesName.push(name);

        emit CompetenceAdded(name, index);
    }

      function getCompetencesNames() public view returns (string[] memory) {
        return competencesName;
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

     // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256) pure override internal {
        require(from == address(0) || to == address(0), "This a Soulbound token. It cannot be transferred. It can only be burned by the token owner.");
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
