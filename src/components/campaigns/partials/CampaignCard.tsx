import React, { useState } from 'react';
import { Button } from 'antd';
import ViewCampaign from "./ViewCampaign";
import { Link } from "react-router-dom";

const styles = {
    card: {
        padding: '5px 15px',
        margin: '10px',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        borderRadius: '8px',
        padding: '3px',
        border: '1px solid #d3d3d3'
    },
    button: {
        height: "40px",
        padding: "0 15px",
        textAlign: "center",
        fontWeight: "600",
        letterSpacing: "0.2px",
        fontSize: "15px",
        margin: "10px 5px",
        border: "none",
    },
} as const;

const CampaignCard: React.FC = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleViewCampaignClick = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div style={styles.card}>
                <h2>Campaign Title</h2>
                <p>Campaign short description, Campaign short description...</p>
                <img src={'https://random.imagecdn.app/200/150'}
                     alt={'Campaign Title'}
                     title={"Campaign Title"}
                     style={styles.image}/>
                <Button shape="round" type="default" onClick={handleViewCampaignClick} style={styles.button}>
                    More Details
                </Button>
                <Button shape="round" type="primary" style={styles.button}>
                    <Link to="/campaigns/submit">Submit</Link>
                </Button>
                <ViewCampaign isVisible={isModalVisible} onClose={handleModalClose}/>
            </div>
        </>
    );
}
export default CampaignCard;
