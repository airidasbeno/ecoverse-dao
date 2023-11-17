import {Buffer} from "buffer";
import {Layout, ConfigProvider, theme} from "antd";
import {TopMenu, MainContent} from "layout";
import "styles/App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Marketplace from "./components/marketplace/Marketplace";
import Profile from "./components/profile/Profile";
import CreateCampaign from "./components/campaigns/CreateCampaign";
import {configureChains, createConfig, WagmiConfig} from "wagmi";
import {mainnet, sepolia} from "viem/chains";
import {EIP6963Connector, walletConnectProvider} from "@web3modal/wagmi";
import {publicProvider} from 'wagmi/providers/public';
import {CoinbaseWalletConnector} from 'wagmi/connectors/coinbaseWallet';
import {InjectedConnector} from 'wagmi/connectors/injected';
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';
import {createWeb3Modal} from '@web3modal/wagmi/react';

const styles = {
    layout: {
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        fontFamily: "Sora, sans-serif"
    }
} as const;

const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID ?? "";

const {chains, publicClient} = configureChains(
    [mainnet, sepolia],
    [walletConnectProvider({projectId}), publicProvider()]
);

const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
        new WalletConnectConnector({chains, options: {projectId, showQrModal: false, metadata}}),
        new EIP6963Connector({chains}),
        new InjectedConnector({chains, options: {shimDisconnect: true}}),
        new CoinbaseWalletConnector({chains, options: {appName: metadata.name}})
    ],
    publicClient
})

createWeb3Modal({wagmiConfig, projectId, chains});

function App() {
    if (!window.Buffer) window.Buffer = Buffer;
    const {defaultAlgorithm} = theme;
    return (
        <Router>
            <WagmiConfig config={wagmiConfig}>
                <ConfigProvider
                    theme={{
                        algorithm: defaultAlgorithm
                    }}
                >
                    <Layout style={styles.layout}>
                        <TopMenu/>
                        <MainContent>
                            <Routes>
                                <Route path="/" element={<Marketplace/>}/>
                                <Route path="/profile" element={<Profile/>}/>
                                <Route path="/create" element={<CreateCampaign/>}/>
                            </Routes>
                        </MainContent>
                    </Layout>
                </ConfigProvider>
            </WagmiConfig>
        </Router>
    );
}

export default App;
