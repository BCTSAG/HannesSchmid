// contracts/NonFunToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract HSPeterAllen is
    ERC721,
    ERC721URIStorage,
    ERC721Enumerable,
    ERC721Royalty,
    Ownable
{
    using Counters for Counters.Counter;
    uint256 public constant maxSupply = 150;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("HS - Peter Allen #1-#150", "HSPA") {
        _setDefaultRoyalty(msg.sender, 1500);
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        require(totalSupply() < maxSupply);
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Royalty, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage, ERC721Royalty) {
        super._burn(tokenId);
        _resetTokenRoyalty(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize = 1);
    }
}
