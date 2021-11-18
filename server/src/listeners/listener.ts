'use strict';

import {
    checkUserByAddress,
    checkWalletByAddress,
    createUser,
    createWallet, logData,
    updateWalletDeposit, updateWalletWithdraw
} from "../controllers/database";

let Web3 = require('web3');
import {abi} from "../contracts/abi";
import {calculateDecimal} from "../controllers/ethereum";

/**
 * An api key from the 'Infura' network for Testnet.
 */
const url1 = 'https://rinkeby.infura.io/v3/02944e93a8fc48cb8796c7fa43e0e29f'

/**
 * An api key from the 'Infura' network for MainNet.
 */
const url2 = 'https://mainnet.infura.io/v3/02944e93a8fc48cb8796c7fa43e0e29f'

/**
 * Initializing our web3 objects for contacting with Ethereum block chain.
 */
const web3Test = new Web3(url1);
const web3Main = new Web3(url2);

/**
 * Address of our account
 */
const address = '0x9F637286498b52f63e7C43BB758214C52F2D6E1b';

/**
 * An async function that listens to deposit events on blockchain and checks if our transaction was done.
 * @function depositListener
 * @returns {boolean}
 */
export async function depositListener(tokenAddress: String, amount: Number, userAddress: String): Promise<boolean> {

    const contract = new web3Test.eth.Contract(abi,address);
    let data: string | undefined = undefined;

    await contract.getPastEvents('Deposit',
        { fromBlock: "earliest",
            toBlock: "latest"
        },
        ( err: any, events: any) => {
        if(!err) {
            let temp: number;
            temp = events.length;
            data = events[temp-1].returnValues.addressOwner;
        }
        });
    /**
     * Checks if the latest deposit event on blockchain has the same address as our userAddress
     */
    if(data === userAddress){
        const reply: boolean = await checkDatabase(tokenAddress,userAddress);
        if (reply) {
            const amountCalculated = await calculateDecimal(tokenAddress,amount);
            await updateWalletDeposit(tokenAddress,amountCalculated,userAddress);
            await logData(userAddress,tokenAddress,amountCalculated,0);
        }
        return true;
    } else {
        return false;
    }
}

/**
 * An async function that listens to withdraw events on blockchain and checks if our transaction was done.
 * @function withdrawListener
 * @returns {boolean}
 */
export async function withdrawListener(tokenAddress: String, amount: Number, userAddress: String): Promise<boolean> {

    const contract = new web3Test.eth.Contract(abi,address);
    let data: string | undefined = undefined;

    await contract.getPastEvents('Withdraw',
        { fromBlock: "earliest",
            toBlock: "latest"
        },
        ( err: any, events: any) => {
            if(!err) {
                let temp: number;
                temp = events.length;
                data = events[temp-1].returnValues.addressOwner;
            }
    });
    /**
     * Checks if the latest withdraw event on blockchain has the same address as our userAddress
     */
    if(data === userAddress){
        const amountCalculated = await calculateDecimal(tokenAddress,amount);
        await updateWalletWithdraw(tokenAddress,amountCalculated,userAddress);
        await logData(userAddress,tokenAddress,0,amountCalculated);
        return true;
    } else {
        return false;
    }
}

/**
 * An async function that checks the database if user and wallet exists.
 * @function checkDatabase
 * @returns {boolean}
 */
export async function checkDatabase(tokenAddress: String, userAddress: String): Promise<boolean> {

    /**
     * Checks if the Ethereum address is valid. Then performs a query and checks if user and wallet exists.
     * If the responses are empty a new user and a new wallet are created.
     */
    if(web3Main.utils.isAddress(tokenAddress)) {

        const res1: String = await checkUserByAddress(userAddress);
        if(res1.length === 0) {
            await createUser(userAddress);
        }

        const res2: String = await checkWalletByAddress(tokenAddress, userAddress);
        if(res2.length === 0) {
            await createWallet(tokenAddress,0,userAddress);
        }
        return true;

    } else {
        return false;
    }
}