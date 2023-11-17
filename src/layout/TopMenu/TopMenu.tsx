import {FC} from "react";
import {Layout, Menu} from "antd";
import web3Boilerplate_logo from "assets/images/web3Boilerplate_logo.png";
import ConnectAccount from "components/Account/ConnectAccount";
import ChainSelector from "components/ChainSelector";
import {useWindowWidthAndHeight} from "hooks";
import {Link} from "react-router-dom";

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
    }
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
                        <Link to="/campaigns">Campaigns</Link>
                    </Menu.Item>
                    <Menu.Item key="3" style={{minWidth: '150px', textAlign: 'center'}}>
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                </Menu>
                <ChainSelector />
                <ConnectAccount />
            </div>
        </Header>
    );
};

export default TopMenu;

export const Logo: FC = () => {
    const {isMobile} = useWindowWidthAndHeight();
    return (
        // <div style={{ paddingTop: isMobile ? "25px" : "40px" }}>
        <img
            src={web3Boilerplate_logo}
            alt="web3Boilerplate_logo"
            height={'100%'}
            width={isMobile ? "70px" : "90px"}
        />
        // </div>
    );
};