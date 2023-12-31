import { FC } from "react";
import { Button, Layout, Menu } from "antd";
import { useWindowWidthAndHeight } from "hooks";
import { Link } from "react-router-dom";
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from "wagmi";
import logo from "assets/images/ecoversedoa-logo.png";

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
        zIndex: 2,
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
    logo: {
        display: 'flex',
        alignItems: 'center',
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
            <h2>
                <div style={styles.logo}>
                    <img src={logo} alt="EcoVerse DAO" style={{ height: '80px' }} />
                    <h2 style={{ marginLeft: '10px' }}>
                        <Link to="/" style={{ color: '#004517' }}>EcoVerse DAO</Link>
                    </h2>
                </div>
            </h2>
            <div style={styles.headerRight}>
                <Menu style={styles.headerRight}>
                    <Menu.Item key="1" style={{ minWidth: '150px', textAlign: 'center' }}>
                        <Link to="/marketplace">Marketplace</Link>
                    </Menu.Item>
                    {isConnected && (
                        <Menu.Item key="2" style={{ minWidth: '150px', textAlign: 'center' }}>
                            <Link to="/campaigns">My Campaigns</Link>
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
                    <Button shape="round" type="default" style={styles.button} onClick={() => open({ view: 'Account' })}>
                        Wallet Connected
                    </Button>
                )}
                {isConnected && (
                    <Button shape="round" type="primary" style={styles.button}>
                        <Link to="/campaigns/create">Create Campaign</Link>
                    </Button>
                )}
            </div>
        </Header>
    );
};

export default TopMenu;
