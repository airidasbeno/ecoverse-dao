import React from 'react';
import { Modal, Card } from 'antd';

interface ViewCampaignProps {
  isVisible: boolean;
  onClose: () => void;
}

const ViewCampaign: React.FC<ViewCampaignProps> = ({ isVisible, onClose }) => {
  return (
    <>
      <Modal
        title="Conservation Campaign Details"
        visible={isVisible}
        onOk={onClose}
        onCancel={onClose}
        width={600} // Set the width as needed
      >
        <Card>
          <h2>Campaign Title</h2>
          <p>
            Start Date: January 1, 2023
            <br />
            End Date: February 1, 2023
          </p>
          <p>
            Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          {/* Add more campaign details as needed */}
        </Card>
      </Modal>
    </>
  );
};

export default ViewCampaign;
