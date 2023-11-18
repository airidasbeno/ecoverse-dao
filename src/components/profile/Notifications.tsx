import {
    useManageSubscription,
    useW3iAccount,
    useInitWeb3InboxClient,
    useMessages
} from '@web3inbox/widget-react'
import React, { useCallback, useEffect } from 'react';
import { useSignMessage, useAccount, useChainId } from 'wagmi';
import { Table, Button, Card, Row, Col, Tag } from 'antd';

const styles = {
    button: {
        height: "40px",
        padding: "0 20px",
        textAlign: "center",
        fontWeight: "600",
        letterSpacing: "0.2px",
        fontSize: "15px",
        marginLeft: "10px",
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

const Notifications: React.FC = () => {
    const { address, isConnected, connector } = useAccount();
    const connectedChainId = useChainId();
    const { signMessageAsync } = useSignMessage();

    const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID ?? '';
    const isReady = useInitWeb3InboxClient({
        projectId,
        domain: process.env.REACT_APP_WALLETCONNECT_DOMAIN ?? '',
        isLimited: false
    })

    const { account, setAccount, isRegistered, isRegistering, register } = useW3iAccount()
    useEffect(() => {
        if (!address) return
        setAccount(`eip155:1:${address}`)
    }, [address, setAccount])

    const performRegistration = useCallback(async () => {
        if (!address) return
        try {
            await register(message => signMessageAsync({ message }))
        } catch (registerIdentityError) {
            alert(registerIdentityError)
        }
    }, [signMessageAsync, register, address])

    useEffect(() => {
        performRegistration()
    }, [performRegistration])

    const { isSubscribed, isSubscribing, subscribe, isUnsubscribing, unsubscribe } = useManageSubscription()

    const performSubscribe = useCallback(async () => {
        await performRegistration()
        await subscribe()
    }, [subscribe, isRegistered])

    const performUnsubscribe = useCallback(async () => {
        await unsubscribe()
    }, [unsubscribe, isRegistered])

    const { messages } = useMessages()

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
                        <Button shape="round" size="small" type="primary" style={styles.button} onClick={() => window.open(urlObj.contract, "_blank")}>{urlObj.title}</Button>
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
            style: { background: '#4caf50' }
        },
    ];
    const getRowClassName = (record: { id: number }) => {
        return connectedChainId === record.id ? 'selected-row' : '';
    };
    const tableTitle = () => (
        <h2 style={{ textAlign: 'center', margin: '10px 0' }}>Notifications</h2>
    );
    return (
        <>
            {!isReady ? (
                <div>Loading your profile...</div>
            ) : (
                <>
                    {!address ? (
                        <div>Connect your wallet to view your profile</div>
                    ) : (
                        <>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Card title="Profile"
                                        extra={
                                            <Tag color={isConnected ? 'green' : 'red'} style={styles.statusTag}>
                                                {isConnected ? 'Connected' : 'Not Connected'}
                                            </Tag>
                                        }>
                                        <p>Address: {address}</p>

                                        <Table
                                            columns={blockchainColumns}
                                            dataSource={connector?.chains || []}
                                            pagination={false}
                                            rowKey="id"
                                            rowClassName={getRowClassName}
                                        />
                                        <div>Account ID: {account}</div>
                                        <br />
                                    </Card>
                                </Col>
                                <Col span={16}>
                                    {!isRegistered ? (
                                        <div>
                                            To manage profile, sign and register an identity key:&nbsp;
                                            <button onClick={performRegistration} disabled={isRegistering}>
                                                {isRegistering ? 'Signing...' : 'Sign'}
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            {!isSubscribed ? (
                                                <>
                                                    <Button shape="round" size="small" type="primary" style={styles.button} onClick={performSubscribe} disabled={isSubscribing}>
                                                        {isSubscribing ? 'Subscribing...' : 'Subscribe to notifications'}
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button shape="round" size="small" type="default" style={styles.button} onClick={performUnsubscribe} disabled={isUnsubscribing}>
                                                        {isUnsubscribing ? 'Unsubscribing...' : 'Unsubscribe'}
                                                    </Button>
                                                    {
                                                        <Table
                                                            columns={columns}
                                                            pagination={false}
                                                            scroll={{ x: true }}
                                                            title={tableTitle}
                                                            size="small"
                                                            dataSource={messages}
                                                            style={{ marginTop: '10px' }}
                                                            rowKey="id" />
                                                    }
                                                </>
                                            )}
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </>
                    )}
                </>
            )}
        </>
    )
};

export default Notifications;
