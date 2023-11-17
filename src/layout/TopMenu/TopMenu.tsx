import {FC} from "react";
import {Button, Layout, Menu} from "antd";
import {useWindowWidthAndHeight} from "hooks";
import {Link} from "react-router-dom";

import {createWeb3Modal, useWeb3Modal} from '@web3modal/wagmi/react'
import {walletConnectProvider, EIP6963Connector} from '@web3modal/wagmi'

import {WagmiConfig, configureChains, createConfig} from 'wagmi'
import {publicProvider} from 'wagmi/providers/public'
import {mainnet, sepolia} from 'viem/chains'
import {CoinbaseWalletConnector} from 'wagmi/connectors/coinbaseWallet'
import {InjectedConnector} from 'wagmi/connectors/injected'
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect'

const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID ?? "";

const {chains, publicClient} = configureChains(
    [mainnet, sepolia],
    [walletConnectProvider({projectId}), publicProvider()]
)

const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

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

createWeb3Modal({wagmiConfig, projectId, chains})

const {open} = useWeb3Modal();

const {Header} = Layout;

const styles = {
    header: {
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#f5f5f5",
        paddingTop: "15px",
        zIndex: 1,
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    },
    headerRight: {
        display: "flex",
        alignItems: "center",
        paddingRight: "10px",
        fontSize: "15px",
        fontWeight: "600",
        backgroundColor: "#f5f5f5",
    },
    button: {
        height: "40px",
        padding: "0 20px",
        textAlign: "center",
        fontWeight: "600",
        letterSpacing: "0.2px",
        fontSize: "15px",
        marginLeft: "10px",
        border: "none",
    },
} as const;

const TopMenu: FC = () => {
    const {isMobile} = useWindowWidthAndHeight();
    return (
        <Header style={{...styles.header, padding: isMobile ? "0 5px 0 5px" : "0 20px"}}>
            <Logo/>
            <div style={styles.headerRight}>
                <Menu style={styles.headerRight}>
                    <Menu.Item key="1" style={{minWidth: '150px', textAlign: 'center'}}>
                        <Link to="/">Marketplace</Link>
                    </Menu.Item>
                    <Menu.Item key="2" style={{minWidth: '150px', textAlign: 'center'}}>
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                </Menu>
                <WagmiConfig config={wagmiConfig}>
                    <Button shape="round" type="primary" style={styles.button} onClick={() => open()}>
                        Connect Wallet
                    </Button>
                    <Button shape="round" type="primary" style={styles.button} onClick={() => open({view: 'Networks'})}>
                        Switch Network
                    </Button>
                </WagmiConfig>
                <Button shape="round" type="primary" style={styles.button}>
                    <Link to="/create">Create Campaign</Link>
                </Button>
            </div>
        </Header>
    );
};

export default TopMenu;

export const Logo: FC = () => {
    // const {isMobile} = useWindowWidthAndHeight();
    return (
        <p>LOGO</p>
        // <div style={{ paddingTop: isMobile ? "25px" : "40px" }}>
        // <img
        //     src={logo}
        //     alt="logo"
        //     height={'100%'}
        //     width={isMobile ? "70px" : "90px"}
        // />
        // </div>
    );
};