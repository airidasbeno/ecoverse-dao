import React from 'react';
import {Button, Col, Row} from 'antd';


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

const Marketplace: React.FC = () => (
    <>
        <h1>Marketplace</h1>
        <p>Welcome to our unique shopping platform. Experience a whole new world of online shopping where quality meets
            convenience. Explore our vast range of products, savor exclusive discounts, and enjoy seamless browsing.
            Your satisfaction is our promise!</p>
        <Row>
            <Col span={6}>
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
            </Col>
            <Col span={6}>
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
            </Col>
            <Col span={6}>
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
            </Col>
            <Col span={6}>
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
            </Col>
        </Row>
        <Row>
            <Col span={6}>
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
            </Col>
            <Col span={6}>
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
            </Col>
            <Col span={6}>
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
            </Col>
            <Col span={6}>
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
            </Col>
        </Row>
    </>
);
export default Marketplace;