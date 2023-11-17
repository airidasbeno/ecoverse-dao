import React from 'react';
import {Button} from 'antd';


const styles = {
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
        <div style={{
            border: '1px solid #d3d3d3',
            padding: '5px',
            margin: '10px',
            textAlign: 'center',
            borderRadius: '8px'
        }}>
            <h2>asdasdasd</h2>
            <p>asdasdasda sadas dasd asdas dasd</p>
            <img src={'https://random.imagecdn.app/300/300'} alt={'aa'} width={'100%'}
                 style={{borderRadius: '8px', padding: '3px', border: '1px solid #d3d3d3'}}/>
            <Button shape="round" type="primary" style={styles.button}>
                Action
            </Button>
        </div>
    </>
);
export default MarketplaceCard;