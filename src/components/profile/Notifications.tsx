import {
    useManageSubscription,
    useW3iAccount,
    useInitWeb3InboxClient,
    useMessages
} from '@web3inbox/widget-react'
import React, { useCallback, useEffect } from 'react';
import { useSignMessage, useAccount } from 'wagmi';
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
    const { address } = useAccount();
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
            {!isReady ? (
                <div>Loading your notifications...</div>
            ) : (
                <>
                    {!address ? (
                        <div>Connect your wallet to view your notifications</div>
                    ) : (
                        <>
                            <div>Address: {address}</div>
                            <div>Account ID: {account}</div>
                            {!isRegistered ? (
                                <div>
                                    To manage notifications, sign and register an identity key:&nbsp;
                                    <button onClick={performRegistration} disabled={isRegistering}>
                                        {isRegistering ? 'Signing...' : 'Sign'}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {!isSubscribed ? (
                                        <>
                                            <button onClick={performSubscribe} disabled={isSubscribing}>
                                                {isSubscribing ? 'Subscribing...' : 'Subscribe to notifications'}
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={performUnsubscribe} disabled={isUnsubscribing}>
                                                {isUnsubscribing ? 'Unsubscribing...' : 'Unsubscribe'}
                                            </button>
                                            <Table
                                                columns={columns}
                                                pagination={false}
                                                scroll={{ x: true }}
                                                size="small"
                                                dataSource={messages}
                                                rowKey="id" />
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
