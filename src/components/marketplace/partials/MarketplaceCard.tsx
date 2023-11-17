import React from 'react';
import {Button} from 'antd';

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
        padding: "0 20px",
        textAlign: "center",
        fontWeight: "600",
        letterSpacing: "0.2px",
        fontSize: "15px",
        margin: "10px 0",
        border: "none",
    },
} as const;

const MarketplaceCard: React.FC = () => (
    <>
        <div style={styles.card}>
            <h2>Campaign Title</h2>
            <p>Campaign short description, Campaign short description...</p>
            <img src={'https://random.imagecdn.app/200/150'}
                 alt={'Campaign Title'}
                 title={"Campaign Title"}
                 style={styles.image}/>
            <Button shape="round" type="primary" style={styles.button}>
                View Campaign
            </Button>
        </div>
    </>
);
export default MarketplaceCard;