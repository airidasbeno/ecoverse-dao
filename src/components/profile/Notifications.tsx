import {
    useManageSubscription,
    useW3iAccount,
    useInitWeb3InboxClient,
    useMessages
} from '@web3inbox/widget-react'
import React, { useCallback, useEffect } from 'react';
import { useSignMessage, useAccount, useChainId } from 'wagmi';
import { Table, Button } from 'antd';

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

    return (
        <>
            <h1>My Profile</h1>
            <p>Welcome to our unique shopping platform. Experience a whole new world of online shopping where quality
                meets
                convenience. Explore our vast range of products, savor exclusive discounts, and enjoy seamless browsing.
                Your satisfaction is our promise!</p>
            {!isReady ? (
                <div>Loading your profile...</div>
            ) : (
                <>
                    {!address ? (
                        <div>Connect your wallet to view your profile</div>
                    ) : (
                        <>
                            <p>Status: {isConnected ? 'Connected' : 'Not Connected'}</p>
                            <p>Address: {address}</p>

                            {connector?.chains.map((chain, index) => (
                                <p key={index}>
                                    <strong>{connectedChainId === chain.id ? 'Current - ' : ''}</strong>
                                    Blockchain: {chain.name} ({chain.id})
                                </p>
                            ))}
                            <div>Address: {address}</div>
                            <div>Account ID: {account}</div>
                            <br/>
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
                                            <Button shape="round" size="small" type="primary" style={styles.button}
                                                    onClick={performSubscribe} disabled={isSubscribing}>
                                                {isSubscribing ? 'Subscribing...' : 'Subscribe to notifications'}
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button shape="round" size="small" type="default" style={styles.button}
                                                    onClick={performUnsubscribe} disabled={isUnsubscribing}>
                                                {isUnsubscribing ? 'Unsubscribing...' : 'Unsubscribe'}
                                            </Button>
                                            {
                                                <Table
                                                    columns={columns}
                                                    pagination={false}
                                                    scroll={{x: true}}
                                                    size="small"
                                                    dataSource={messages}
                                                    style={{marginTop: '10px'}}
                                                    rowKey="id"/>
                                            }
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    )
};

export default Notifications;
