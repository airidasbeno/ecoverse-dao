import { useState } from 'react';

import { ethers } from 'ethers';

import contractAbi from '../assets/abis/marketplace.json';

export interface Listing {
    seller: string;
    tokenAddress: string;
    tokenId: string;
    amount: number;
    price: number;
}

const contractAddresses: { [key: number]: string } = {
    5: "0xF6466904489b4b2cf375FE26d8Ac297Cfc6f49dF",
    534351: "0xB16d8FBFaB7439C562A37378fbF276183D304B28",
    59140: "0xbA972364da5beB6A58d6144258dBB30F823d4eE6",
    11155111: "0x58dCAA5376599B7b3bd76f7B4c5EBbE1D9F59104",
};

export const useNFTMarketplace = () => {
    const [listings, setListings] = useState<Listing[]>([]);

    function isValidEthereumAddress(address: string) {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    }

    const listNFT = async (tokenAddress: string, tokenId: number, amount: number, price: number) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum  as unknown as ethers.providers.ExternalProvider);
            const signer = provider.getSigner();
            const network = await provider.getNetwork();
            const currentAddress = contractAddresses[network.chainId];
            const contract = new ethers.Contract(currentAddress, contractAbi, signer);
            console.log(isValidEthereumAddress(tokenAddress));
            const priceInWei = ethers.utils.parseUnits(price.toString(), 'ether');
              // Specify gas parameters
        const gasLimit = ethers.utils.hexlify(1000000);
        const gasPrice = await provider.getGasPrice();

        const txParams = {
            gasLimit: gasLimit,
            gasPrice: gasPrice
        };

        const transaction = await contract.listNFT(tokenAddress, tokenId, amount, priceInWei, txParams);
        await transaction.wait();
            await transaction.wait();
            console.log('NFT listed successfully');
            return { success: true, hash: transaction.hash };
        } catch (error) {
            console.error('Error listing NFT:', error);
            return { success: false, hash: null };
        }
    };

    const purchaseNFT = async (listingIndex: number, amount: number) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum  as unknown as ethers.providers.ExternalProvider);
        const signer = provider.getSigner();
        const network = await provider.getNetwork();
        const currentAddress = contractAddresses[network.chainId];
        const contract = new ethers.Contract(currentAddress, contractAbi, signer);

        try {
            const fetchedListings = await contract.getAllListings();
            const listing = fetchedListings[listingIndex];
            const totalCost = listing.price * amount;
            const transaction = await contract.purchaseNFT(listingIndex, amount, { value: ethers.utils.parseEther(String(totalCost)) });
            await transaction.wait();
            console.log('NFT purchased successfully');
        } catch (error) {
            console.error('Error purchasing NFT:', error);
        }
    };

    const fetchAllListings = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum  as unknown as ethers.providers.ExternalProvider);
        const signer = provider.getSigner();
        const network = await provider.getNetwork();
        const currentAddress = contractAddresses[network.chainId];
        const contract = new ethers.Contract(currentAddress, contractAbi, signer);

        try {
            const fetchedListings = await contract.getAllListings();
            setListings(fetchedListings.map((listing: { price: ethers.BigNumberish; }) => ({
                ...listing,
                price: ethers.utils.formatUnits(listing.price, 'ether')
            })));
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    return { listNFT, purchaseNFT, fetchAllListings, listings };
};

export default useNFTMarketplace;
