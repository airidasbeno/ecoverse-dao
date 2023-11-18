import { ethers } from 'ethers';

const contractABI: ethers.ContractInterface = [
    // Add the ABI of your contract here
    // Make sure to include the updated mintUniqueToken function's ABI
];

const contractAddreses: { [key: number]: string } = {
    5: "0xd9145CCE52D386f254917e481eB44e9943F39138",
    111: "",
};

const useMintNFT = async () => {
const provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ethers.providers.ExternalProvider);
const network = await provider.getNetwork();
const signer: ethers.Signer | ethers.providers.Provider | undefined = provider.getSigner();

    const contract = new ethers.Contract(contractAddreses[network.chainId], contractABI, signer);

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
