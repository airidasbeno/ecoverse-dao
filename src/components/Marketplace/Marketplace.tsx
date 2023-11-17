import React from 'react';
import {Col, Row} from 'antd';
import MarketplaceCard from "./partials/MarketplaceCard";

const Marketplace: React.FC = () => (
    <>
        <h1>Marketplace</h1>
        <p>Welcome to our unique shopping platform. Experience a whole new world of online shopping where quality meets
            convenience. Explore our vast range of products, savor exclusive discounts, and enjoy seamless browsing.
            Your satisfaction is our promise!</p>
        <Row>
            <Col span={6}>
                <MarketplaceCard />
            </Col>
            <Col span={6}>
                <MarketplaceCard />
            </Col>
            <Col span={6}>
                <MarketplaceCard />
            </Col>
            <Col span={6}>
                <MarketplaceCard />
            </Col>
        </Row>
    </>
);
export default Marketplace;
