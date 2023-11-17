import {Web3ReactHooks} from "@web3-react/core";
import {MetaMask} from "@web3-react/metamask";
import {Network} from "@web3-react/network";
import {WalletConnect} from "@web3-react/walletconnect-v2";

import {hooks as metaMaskHooks, metaMask} from "./metaMask";
import {hooks as networkHooks, network} from "./network";
import {hooks as walletConnectHooks, walletConnect} from "./walletConnect";

const connectors: [MetaMask | WalletConnect | Network, Web3ReactHooks][] = [
    [metaMask, metaMaskHooks],
    [walletConnect, walletConnectHooks],
    [network, networkHooks]
];

export default connectors;
