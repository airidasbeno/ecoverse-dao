import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import useNFTMarketplace, { Listing } from "../../hooks/useMarketplace";

const Marketplace: React.FC = () => {
    const [listings, setListings] = useState<Listing[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { listings } = await useNFTMarketplace();
            setListings(listings);
        };

        fetchData();
    }, []);

    return (
        <>
            <h1>Marketplace</h1>
            <p>
                Welcome to our unique shopping platform. Experience a whole new world of online shopping where quality
                meets convenience. Explore our vast range of products, savor exclusive discounts, and enjoy seamless
                browsing. Your satisfaction is our promise!
            </p>
            <Row>
                {listings.map((listing: Listing, index: number) => (
                    <Col span={6} key={index}>
                        {/* Render the properties of the listing object */}
                        {listing.seller}, {listing.tokenAddress}, {listing.tokenId}, {listing.price}
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Marketplace;
