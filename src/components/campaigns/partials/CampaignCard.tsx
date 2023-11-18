import React, { useState } from 'react';
import { Button } from 'antd';
import ViewCampaign from "./ViewCampaign";
import { Link } from "react-router-dom";

const styles = {
  card: {
    border: '1px solid #d3d3d3',
    padding: '5px 15px',
    margin: '10px',
    textAlign: 'center',
    borderRadius: '8px'
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
    fontSize: "14px",
    margin: "4px 8px",
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
          style={styles.image} />
        <Button shape="round" type="primary" style={styles.button}>
          <Link to="/campaigns/add-to-marketplace">Add to Marketplace</Link>
        </Button>
        <Button shape="round" type="primary" onClick={handleViewCampaignClick} style={styles.button}>
          View Campaign
        </Button>
        <ViewCampaign isVisible={isModalVisible} onClose={handleModalClose} />
      </div>
    </>
  );
}
export default CampaignCard;