import {
    useManageSubscription,
    useW3iAccount,
    useInitWeb3InboxClient,
    useMessages
} from '@web3inbox/widget-react'
import React, {useCallback, useEffect} from 'react';
import {useSignMessage, useAccount, useChainId} from 'wagmi';
import {Table, Button, Card, Row, Col, Tag} from 'antd';
import {useWeb3Modal} from '@web3modal/wagmi/react'

const styles = {
    button: {
        height: "40px",
        padding: "0 20px",
        textAlign: "center",
        fontWeight: "600",
        letterSpacing: "0.2px",
        fontSize: "15px",
        border: "none",
        color: "white",
    },
    whiteButton: {
        height: "40px",
        padding: "0 20px",
        textAlign: "center",
        fontWeight: "600",
        letterSpacing: "0.2px",
        fontSize: "15px",
        border: "none",
    },
    statusTag: {
        fontSize: '14px',
        fontWeight: 'bold',
    },
    connectedRow: {
        background: '#4caf50',
    },
} as const;

const Profile: React.FC = () => {
    const {address, isConnected, connector} = useAccount();
    const connectedChainId = useChainId();
    const {signMessageAsync} = useSignMessage();
    const {open} = useWeb3Modal();

    const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID ?? '';
    useInitWeb3InboxClient({
        projectId,
        domain: process.env.REACT_APP_WALLETCONNECT_DOMAIN ?? '',
        isLimited: false
    })

    const {account, setAccount, isRegistered, isRegistering, register} = useW3iAccount()
    useEffect(() => {
        if (!address) return
        setAccount(`eip155:1:${address}`)
    }, [address, setAccount])

    const performRegistration = useCallback(async () => {
        if (!address) return
        try {
            await register(message => signMessageAsync({message}))
        } catch (registerIdentityError) {
            alert(registerIdentityError)
        }
    }, [signMessageAsync, register, address])

    useEffect(() => {
        performRegistration()
    }, [performRegistration])

    const {isSubscribed, isSubscribing, subscribe, isUnsubscribing, unsubscribe} = useManageSubscription()

    const performSubscribe = useCallback(async () => {
        await performRegistration()
        await subscribe()
    }, [subscribe, isRegistered])

    const performUnsubscribe = useCallback(async () => {
        await unsubscribe()
    }, [unsubscribe, !isRegistered])

    const {messages} = useMessages()

    const columns = [
        {
            title: 'Title',
            dataIndex: ['message', 'title'],
            key: 'title'
        },
        {
            title: 'Body',
            dataIndex: ['message', 'body'],
            key: 'body'
        },
        {
            title: 'Date',
            dataIndex: 'publishedAt',
            key: 'publishedAt',
            render: (text: number) => new Date(text).toLocaleString()
        },
        {
            title: 'Actions',
            dataIndex: ['message', 'url'],
            key: 'url',
            render: (text: string) => {
                if (text.split("")[0] === "{") {
                    const urlObj = JSON.parse(text)
                    console.log("urlObj", urlObj)
                    return (
                        <Button shape="round" size="small" type="primary" style={styles.button}
                                onClick={() => window.open(urlObj.contract, "_blank")}>{urlObj.title}</Button>
                    )
                } else {
                    return (
                        null
                    )
                }
            }
        },
    ];
    const blockchainColumns = [
        {
            title: 'Blockchain',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            style: {background: '#4caf50'}
        },
    ];
    const getRowClassName = (record: { id: number }) => {
        return connectedChainId === record.id ? 'selected-row' : '';
    };

    return (
        <>
            <h1>My Profile</h1>
            <p>Welcome to our unique shopping platform. Experience a whole new world of online shopping where quality
                meets
                convenience. Explore our vast range of products, savor exclusive discounts, and enjoy seamless browsing.
                Your satisfaction is our promise!</p>
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Profile"
                          extra={
                              <Tag color={isConnected ? '#004517' : 'red'} style={styles.statusTag}>
                                  {isConnected ? 'Connected' : 'Not Connected'}
                              </Tag>
                          }>
                        {isConnected && (
                            <>
                                <p style={{marginTop: 0}}><strong>Your Address:</strong> {address}</p>
                                {isRegistered && (
                                    <p style={{marginBottom: '30px'}}>
                                        <strong>Web3Inbox Account ID:</strong> {account}
                                    </p>
                                )}
                                <Table
                                    columns={blockchainColumns}
                                    dataSource={connector?.chains || []}
                                    pagination={false}
                                    rowKey="id"
                                    rowClassName={getRowClassName}
                                />
                                <div style={{textAlign: 'center', marginTop: '20px'}}>
                                    <Button shape="round" size="small" type="primary"
                                            style={styles.button} onClick={() => open({view: 'Networks'})}>
                                        Switch Network
                                    </Button>
                                </div>
                            </>
                        )}
                        {!isConnected && (
                            <div style={{textAlign: 'center'}}>
                                <Button shape="round" type="primary" style={styles.button} onClick={() => open()}>
                                    Connect Wallet
                                </Button>
                            </div>
                        )}
                    </Card>
                </Col>
                <Col span={16}>
                    <h2 style={{marginTop: 0}}>Notifications</h2>
                    <p>Stay informed with personalized notifications tailored to your
                        preferences. Receive timely updates and alerts with our user-friendly
                        notification system.</p>
                    {isConnected ? (
                        <>
                            {!isRegistered ? (
                                <div style={{textAlign: "center", marginTop: '20px'}}>
                                    <Button shape="round" size="small" type="primary"
                                            style={styles.button} onClick={performRegistration}
                                            disabled={isRegistering}>
                                        {isRegistering ? 'Signing...' : 'Sign to Receive Notifications'}
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    {!isSubscribed ? (
                                        <>
                                            <div style={{textAlign: "center", marginTop: '20px'}}>
                                                <Button shape="round" size="small" type="primary"
                                                        style={styles.button} onClick={performSubscribe}
                                                        disabled={isSubscribing}>
                                                    {isSubscribing ? 'Subscribing...' : 'Subscribe to Notifications'}
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Table
                                                columns={columns}
                                                pagination={false}
                                                scroll={{x: true}}
                                                size="small"
                                                dataSource={messages}
                                                style={{marginTop: '10px'}}
                                                rowKey="id"/>
                                            <div style={{textAlign: "center", marginTop: '20px'}}>
                                                <Button shape="round" size="small" type="default"
                                                        style={styles.whiteButton} onClick={performUnsubscribe}
                                                        disabled={isUnsubscribing}>
                                                    {isUnsubscribing ? 'Unsubscribing...' : 'Unsubscribe'}
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <div style={{textAlign: 'center'}}>
                            <Button shape="round" type="primary" style={styles.button} onClick={() => open()}>
                                Connect Wallet
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </>
    )
};

export default Profile;
