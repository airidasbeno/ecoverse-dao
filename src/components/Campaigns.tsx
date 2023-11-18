import React from 'react';
import {Button, Col, Row} from 'antd';
import CampaignCard from "./campaigns/partials/CampaignCard";
import { useAccount } from "wagmi";
import { useWeb3Modal } from '@web3modal/wagmi/react';

const styles = {
    button: {
        height: "40px",
        padding: "0 20px",
        textAlign: "center",
        fontWeight: "600",
        letterSpacing: "0.2px",
        fontSize: "15px",
        border: "none",
        color: "white",
        marginTop: "20px",
    },
} as const;

const Campaigns: React.FC = () => {
    const {isConnected} = useAccount();
    const {open} = useWeb3Modal();

    return (
        <>
            <h1>My Campaigns</h1>
            <p>Welcome to our unique shopping platform. Experience a whole new world of online shopping where quality
                meets convenience. Explore our vast range of products, savor exclusive discounts, and enjoy seamless
                browsing. Your satisfaction is our promise!</p>
            {isConnected ? (
                <Row>
                    <Col span={6}>
                        <CampaignCard/>
                    </Col>
                    <Col span={6}>
                        <CampaignCard/>
                    </Col>
                    <Col span={6}>
                        <CampaignCard/>
                    </Col>
                    <Col span={6}>
                        <CampaignCard/>
                    </Col>
                </Row>
            ) : (
                <div style={{textAlign: 'left'}}>
                    <Button shape="round" type="primary" style={styles.button} onClick={() => open()}>
                        Connect Wallet
                    </Button>
                </div>
            )}
        </>
    );
};
export default Campaigns;
