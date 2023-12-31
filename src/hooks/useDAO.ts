import { ethers } from 'ethers';

import contractAbi from '../assets/abis/dao.json';

export const contractAddresses: { [key: number]: string } = {
    5: "0x378545248b063e592383e83426B1e4860DFad152",
    534351: "0xFEB5B03A501f808b6E2ed717421012A7549098f5",
    59140: "0xd979b5BC810e17705706FE66401A9f5759092148",
    11155111: "0xbA972364da5beB6A58d6144258dBB30F823d4eE6",
};

export const useDAO = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ethers.providers.ExternalProvider);
    const signer: ethers.Signer | ethers.providers.Provider | undefined = provider.getSigner();
    const network = await provider.getNetwork();
    const currentAddress = contractAddresses[network.chainId];
    const contract = new ethers.Contract(currentAddress, contractAbi, signer);

    const createCampaign = async (duration: number, votingPeriod: number) => {
        try {
            const tx = await contract.createCampaign(duration, votingPeriod);
            await tx.wait();
            console.log('Campaign created successfully');
        } catch (error) {
            console.error('Error creating campaign:', error);
        }
    };

    const submitProposal = async (campaignId: number, description: string, contractAddress: string) => {
        try {
            const tx = await contract.submitProposal(campaignId, description, contractAddress);
            await tx.wait();
            console.log('Proposal submitted successfully');
        } catch (error) {
            console.error('Error submitting proposal:', error);
        }
    };

    const vote = async (campaignId: number, proposalId: number) => {
        try {
            const tx = await contract.vote(campaignId, proposalId);
            await tx.wait();
            console.log('Voted successfully');
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    const getWinningContract = async (campaignId: number) => {
        try {
            return await contract.getWinningContract(campaignId);
        } catch (error) {
            console.error('Error fetching winning contract:', error);
        }
    };

    return { createCampaign, submitProposal, vote, getWinningContract };
};

export default useDAO;
