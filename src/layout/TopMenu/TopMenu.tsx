import { FC } from "react";
import { Button, Layout, Menu } from "antd";
import { useWindowWidthAndHeight } from "hooks";
import { Link } from "react-router-dom";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from "wagmi";

const { Header } = Layout;

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
    const { isMobile } = useWindowWidthAndHeight();
    const { open } = useWeb3Modal();
    const { isConnected } = useAccount();

    return (
        <Header style={{ ...styles.header, padding: isMobile ? "0 5px 0 5px" : "0 20px" }}>
            <h2>ETHGlobal Hackathon</h2>
            <div style={styles.headerRight}>
                <Menu style={styles.headerRight}>
                    <Menu.Item key="1" style={{ minWidth: '150px', textAlign: 'center' }}>
                        <Link to="/">Marketplace</Link>
                    </Menu.Item>
                    {isConnected && (
                        <Menu.Item key="2" style={{ minWidth: '150px', textAlign: 'center' }}>
                            <Link to="/campaigns">My Campaings</Link>
                        </Menu.Item>
                    )}
                    {isConnected && (
                        <Menu.Item key="3" style={{ minWidth: '150px', textAlign: 'center' }}>
                            <Link to="/profile">My Profile</Link>
                        </Menu.Item>
                    )}
                </Menu>
                {!isConnected && (
                    <Button shape="round" type="primary" style={styles.button} onClick={() => open()}>
                        Connect Wallet
                    </Button>
                )}
                {isConnected && (
                    <Button shape="round" type="primary" style={styles.button} onClick={() => open({ view: 'Account' })}>
                        Connected Wallet
                    </Button>
                )}
                {isConnected && (
                    <Button shape="round" type="primary" style={styles.button}>
                        <Link to="/create">Create Campaign</Link>
                    </Button>
                )}
            </div>
        </Header>
    );
};

export default TopMenu;
