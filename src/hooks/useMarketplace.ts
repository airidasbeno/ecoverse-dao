import { useState} from 'react';

import { ethers } from 'ethers';

import contractAbi from '../assets/abis/marketplace.json';

export interface Listing {
    seller: string;
    tokenAddress: string;
    tokenId: string;
    price: number;
}

const contractAddreses:  { [key: number]: string }= {
    5: "0xF6466904489b4b2cf375FE26d8Ac297Cfc6f49dF",
    534351: "0xB16d8FBFaB7439C562A37378fbF276183D304B28",
    59140: "0xbA972364da5beB6A58d6144258dBB30F823d4eE6"
}

export const useNFTMarketplace = async () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ethers.providers.ExternalProvider);
    const signer: ethers.Signer | ethers.providers.Provider | undefined = provider.getSigner();
    const network = await provider.getNetwork();
    const currentAddress = contractAddreses[network.chainId];
    const contract = new ethers.Contract(currentAddress, contractAbi, signer);

    const listNFT = async (tokenAddress: string, tokenId: number, price: number) => {
        try {
            const transaction = await contract.listNFT(tokenAddress, tokenId, ethers.utils.parseUnits(price.toString(), 'ether'));
            await transaction.wait();
            console.log('NFT listed successfully');
            fetchAllListings();
        } catch (error) {
            console.error('Error listing NFT:', error);
        }
    };

    const purchaseNFT = async (listingIndex: number) => {
        try {
            const fetchedListings = await contract.getAllListings();
            const transaction = await contract.purchaseNFT(listingIndex, { value: ethers.utils.parseEther(String(fetchedListings[listingIndex].price)) });
            await transaction.wait();
            console.log('NFT purchased successfully');
        } catch (error) {
            console.error('Error purchasing NFT:', error);
        }
    };

    const fetchAllListings = async () => {
        try {
            const fetchedListings = await contract.getAllListings();
            setListings(fetchedListings);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    return { listNFT, purchaseNFT, fetchAllListings, listings };
};

export default useNFTMarketplace;
