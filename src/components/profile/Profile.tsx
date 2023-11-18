import React from 'react';
import ProfileCard from "./partials/ProfileCard";
import {Col, Row} from 'antd';


const Profile: React.FC = () => {
    return (
        <>
            <h1>Profile</h1>
            <p>Welcome to our unique shopping platform. Experience a whole new world of online shopping where quality meets
                convenience. Explore our vast range of products, savor exclusive discounts, and enjoy seamless browsing.
                Your satisfaction is our promise!</p>
            <h2>Your Current Compaigns:</h2>
            <Row>
                <Col span={4}>
                    <ProfileCard />
                </Col>
                <Col span={4}>
                    <ProfileCard />
                </Col>
            </Row>
        </>
        
    );
};
export default Profile;
