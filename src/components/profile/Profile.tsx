import React from 'react';
import {useAccount} from "wagmi";

const Profile: React.FC = () => {
    const { address, isConnected } = useAccount();

    return (
        <>
            <h1>Profile</h1>
            <p>Welcome to our unique shopping platform. Experience a whole new world of online shopping where quality meets
                convenience. Explore our vast range of products, savor exclusive discounts, and enjoy seamless browsing.
                Your satisfaction is our promise!</p>
            <p>Status: {isConnected ? 'Connected' : 'Not Connected'}</p>
            <p>Address: {address}</p>
        </>
    );
};

export default Profile;
