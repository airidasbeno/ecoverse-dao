import { ethers } from 'ethers';

import contractAbi from '../assets/abis/mint.json';

export const contractAddreses: { [key: number]: string } = {
    5: "0xd9145CCE52D386f254917e481eB44e9943F39138",
    534351: "0x61BEcD8eBD72fE73De9B8Be4368EeF7f78c77053",
    59140: "0x61BEcD8eBD72fE73De9B8Be4368EeF7f78c77053"
};

const useMintNFT = async () => {
const provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ethers.providers.ExternalProvider);
const network = await provider.getNetwork();
const signer: ethers.Signer | ethers.providers.Provider | undefined = provider.getSigner();

    const contract = new ethers.Contract(contractAddreses[network.chainId], contractAbi, signer);

    const mintUniqueToken = async (to: string, amount: number, tokenURI: string, data?: string) => {
        try {
            const dataBytes = data ? ethers.utils.toUtf8Bytes(data) : '0x';

            const mintTx = await contract.mintUniqueToken(to, amount, tokenURI, dataBytes);
            await mintTx.wait();
            console.log('Minting successful', mintTx.hash);
        } catch (error) {
            console.error('Error minting token:', error);
        }
    };

    return mintUniqueToken;
};

export default useMintNFT;
