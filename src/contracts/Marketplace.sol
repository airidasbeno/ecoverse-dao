// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarketplace is ReentrancyGuard {
    struct Listing {
        address seller;
        address tokenAddress;
        uint256 tokenId;
        uint256 price;
    }

    Listing[] public listings;

    event Listed(address indexed seller, address indexed tokenAddress, uint256 indexed tokenId, uint256 price);
    event Purchased(address indexed buyer, address indexed tokenAddress, uint256 indexed tokenId, uint256 price);

    function listNFT(address tokenAddress, uint256 tokenId, uint256 price) public {
        IERC721 token = IERC721(tokenAddress);
        require(token.ownerOf(tokenId) == msg.sender, "Only the owner can list");
        require(token.getApproved(tokenId) == address(this), "Marketplace not approved");

        Listing memory listing = Listing({
            seller: msg.sender,
            tokenAddress: tokenAddress,
            tokenId: tokenId,
            price: price
        });

        listings.push(listing);
        emit Listed(msg.sender, tokenAddress, tokenId, price);
    }

    function purchaseNFT(uint256 listingIndex) public payable nonReentrant {
        Listing memory listing = listings[listingIndex];
        require(msg.value == listing.price, "Incorrect value");

        IERC721 token = IERC721(listing.tokenAddress);
        token.transferFrom(listing.seller, msg.sender, listing.tokenId);

        payable(listing.seller).transfer(listing.price);

        // Remove the listing
        listings[listingIndex] = listings[listings.length - 1];
        listings.pop();

        emit Purchased(msg.sender, listing.tokenAddress, listing.tokenId, listing.price);
    }

    function getAllListings() public view returns (Listing[] memory) {
    return listings;
}
}
