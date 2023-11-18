import {
    useManageSubscription,
    useSubscription,
    useW3iAccount,
    useInitWeb3InboxClient,
    useMessages
} from '@web3inbox/widget-react'
import React, { useCallback, useEffect } from 'react';
import { useSignMessage, useAccount } from 'wagmi';
import { Table } from 'antd';

// const messages = [
//     {
//         id: 1700292763470,
//         topic: "0d9d529b5895dba78955a39d4317d518661db72f74332b348b3e840636947051",
//         message: {
//             id: "10fe466f-c2c8-4e50-9a17-ad4df8779a11",
//             type: "7c18bf6a-62f2-4443-b911-4647f6966b8a",
//             title: "2123",
//             body: "123123",
//             icon: "https://imagedelivery.net/_aTEfDRm7z3tKgu9JhfeKA/null/md",
//             url: "https://cloud.walletconnect.com/app/notify"
//         },
//         publishedAt: 1700292763000
//     }
// ];

const { messages } = useMessages()


const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Topic',
        dataIndex: 'topic',
        key: 'topic'
    },
    {
        title: 'Message ID',
        dataIndex: ['message', 'id'],
        key: 'messageId'
    },
    {
        title: 'Type',
        dataIndex: ['message', 'type'],
        key: 'type'
    },
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
        title: 'Icon',
        dataIndex: ['message', 'icon'],
        key: 'icon',
        render: (text: string) => <img src={text} alt="Icon" style={{ width: '24px', height: '24px' }} />
    },
    {
        title: 'URL',
        dataIndex: ['message', 'url'],
        key: 'url',
        render: (text: string) => <a href={text}>{text}</a>
    },
    {
        title: 'Published At',
        dataIndex: 'publishedAt',
        key: 'publishedAt',
        render: (text: number) => new Date(text).toLocaleString()
    }
];

const Notifications: React.FC = () => {
    const { address } = useAccount();
    const { signMessageAsync } = useSignMessage();

    const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID ?? '';
    // Initialize the Web3Inbox SDK
    const isReady = useInitWeb3InboxClient({
        // The project ID and domain you setup in the Domain Setup section
        projectId,
        domain: process.env.REACT_APP_WALLETCONNECT_DOMAIN ?? '',

        // Allow localhost development with "unlimited" mode.
        // This authorizes this dapp to control notification subscriptions for all domains (including `app.example.com`), not just `window.location.host`
        isLimited: false
    })

    const { account, setAccount, isRegistered, isRegistering, register } = useW3iAccount()
    useEffect(() => {
        if (!address) return
        // Convert the address into a CAIP-10 blockchain-agnostic account ID and update the Web3Inbox SDK with it
        setAccount(`eip155:1:${address}`)
    }, [address, setAccount])

    // In order to authorize the dapp to control subscriptions, the user needs to sign a SIWE message which happens automatically when `register()` is called.
    // Depending on the configuration of `domain` and `isLimited`, a different message is generated.
    const performRegistration = useCallback(async () => {
        if (!address) return
        try {
            await register(message => signMessageAsync({ message }))
        } catch (registerIdentityError) {
            alert(registerIdentityError)
        }
    }, [signMessageAsync, register, address])

    useEffect(() => {
        // Register even if an identity key exists, to account for stale keys
        performRegistration()
    }, [performRegistration])

    const { isSubscribed, isSubscribing, subscribe } = useManageSubscription()

    const performSubscribe = useCallback(async () => {
        // Register again just in case
        await performRegistration()
        await subscribe()
    }, [subscribe, isRegistered])

    const { subscription } = useSubscription()

    return (
        <>
            {!isReady ? (
                <div>Loading client...</div>
            ) : (
                <>
                    {!address ? (
                        <div>Connect your wallet</div>
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
                                    {isSubscribed ? (
                                        <>
                                            <button onClick={performSubscribe} disabled={isSubscribing}>
                                                {isSubscribing ? 'Subscribing...' : 'Subscribe to notifications'}
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div>You are subscribed</div>
                                            <div>Subscription: {JSON.stringify(subscription)}</div>
                                            <Table columns={columns} dataSource={messages} rowKey="id" />
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
