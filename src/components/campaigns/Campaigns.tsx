import React from 'react';
import { Col, Row } from 'antd';
import MarketplaceCard from "./partials/CampaignCard";

const Campaigns: React.FC = () => {
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Your Campaigns</h1>
            <Row>
                <Col span={6}>
                    <MarketplaceCard />
                </Col>
                <Col span={6}>
                    <MarketplaceCard />
                </Col>
            </Row>
        </>
    );
};

export default Campaigns;
