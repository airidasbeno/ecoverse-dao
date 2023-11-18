import React, { useState } from 'react';
import {Button, Card} from 'antd';
import {Link} from "react-router-dom";
import ViewCampaign from "./ViewCampaign";

const styles = {
    card: {
        margin: '10px',
    },
    image: {
        width: '100%',
        borderRadius: '8px',
        padding: '3px',
        border: '1px solid #c3c3c3'
    },
    button: {
        height: "40px",
        padding: "0 20px",
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
            <Card title="Campaign Title" bordered={true} style={styles.card}>
                <p style={{marginTop: 0, textAlign: 'center'}}>Campaign short description, Campaign short
                    description...</p>
                <img src={'https://random.imagecdn.app/200/150'}
                     alt={'Campaign Title'}
                     title={"Campaign Title"}
                     style={styles.image}/>
                <div style={{textAlign: 'center', marginTop: '15px'}}>
                    <Button shape="round" type="default" onClick={handleViewCampaignClick} style={styles.button}>
                        More Details
                    </Button>
                    <Button shape="round" type="primary" style={styles.button}>
                        <Link to="/campaigns/submit">Submit</Link>
                    </Button>
                </div>
                <ViewCampaign isVisible={isModalVisible} onClose={handleModalClose}/>
            </Card>
        </>
);
}
export default CampaignCard;
