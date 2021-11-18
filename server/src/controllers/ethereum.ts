'use strict';

import {depositListener, withdrawListener} from "../listeners/listener";

let Web3 = require('web3');
import {abi} from "../contracts/abi";
import {abiERC20} from "../contracts/abiERC20";
import {METHODS} from "../contracts/methodsOfContracts";

/**
 * An api key from the 'Infura' network for Testnet.
 */
const url1 = 'https://rinkeby.infura.io/v3/02944e93a8fc48cb8796c7fa43e0e29f'

/**
 * An api key from the 'Infura' network for MainNet.
 */
const url2 = 'https://mainnet.infura.io/v3/02944e93a8fc48cb8796c7fa43e0e29f'

/**
 * The private key from of your account on metamask.
 */
const privateKey = '';

/**
 * Initializing our web3 objects for contacting with Ethereum block chain.
 */
const web3Test = new Web3(url1);
const web3Main = new Web3(url2);

/**
 * Account initialization and addition to wallet
 */
const account = web3Test.eth.accounts.privateKeyToAccount(privateKey);
web3Test.eth.accounts.wallet.add(account);
web3Test.eth.defaultAccount = account.address;

/**
 * Address of our account
 */
const address = '0x9F637286498b52f63e7C43BB758214C52F2D6E1b';

/**
 * An async function that deposits funds to the smart contract.
 * @function depositFundsContract
 * @returns {string}
 */
export async function depositFundsContract(tokenAddress: String, amount: Number, userAddress: String): Promise<string> {

    const contract = new web3Test.eth.Contract(abi,address);
    let message: string | undefined;
    try {
        const gasPrice = await web3Test.eth.getGasPrice();
        const gas = await contract.methods.deposit(amount.toString(),tokenAddress).estimateGas({ from: userAddress });
        await contract.methods.deposit(amount.toString(),tokenAddress).send({
            from: userAddress,
            gasPrice: gasPrice,
            gas: gas
        });
        const ans: boolean = await depositListener(tokenAddress,amount,userAddress);
        if(ans) {
            message = 'Amount deposit successfully.';
        } else {
            message = 'Failed to deposit amount.';
        }
    } catch (error) {
        message = 'Error!'
        console.log(error);
    }
    return message;
}

/**
 * An async function that withdraws funds from the smart contract.
 * @function withdrawFundsContract
 * @returns {string}
 */
export async function withdrawFundsContract(tokenAddress: String, amount: Number, userAddress: String): Promise<string> {

    const contract = new web3Test.eth.Contract(abi,address);
    let message: string | undefined;
    try {
        const gasPrice = await web3Test.eth.getGasPrice();
        const gas = await contract.methods.withdraw(amount.toString(),tokenAddress).estimateGas({ from: userAddress });
        await contract.methods.withdraw(amount.toString(),tokenAddress).send({
            from: userAddress,
            gasPrice: gasPrice,
            gas: gas
        });
        const ans: boolean = await withdrawListener(tokenAddress,amount,userAddress);
        if(ans) {
            message = 'Amount withdrawn successfully.';
        } else {
            message = 'Failed to withdraw amount.'
        }
    } catch (error) {
        message = 'Error!';
        console.log(error);
    }
    return message;
}

/**
 * An async function that calls function approve from the smart contract.
 * @function approveFunds
 * @returns {string}
 */
export async function approveFundsContract(tokenAddress: String, amount: Number, userAddress: String): Promise<any> {

    if(web3Test.utils.isAddress(tokenAddress)) {

        const contract = new web3Main.eth.Contract(abiERC20,address);
        try {
            const gasPrice = await web3Test.eth.getGasPrice();
            const gasEstimate = await contract.methods[METHODS.approve](userAddress,amount).estimateGas({from: account.address});
            const reply = await contract.methods[METHODS.approve](account.address,amount).send({
                from: account.address,
                gasPrice: gasPrice,
                gas: gasEstimate
            });
            if(reply) {
                return 'Funds Approved!';
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        return 'Token not found on the Ethereum Blockchain!';
    }
}

/**
 * An async function that returns the list of tokens from the specified exchange contract.
 * @function returnTokensList
 * @returns {string}
 */
export async function returnTokensList(): Promise<string> {

    if (web3Main.utils.isAddress(address)) {
        const contract = new web3Test.eth.Contract(abi,address);
        return await contract.methods[METHODS.getListTokens]().call();
    } else {
        return 'Address not found on the Ethereum Blockchain!'
    }
}

/**
 * An async function that returns the balance of a token in 'Ether' from the main Ethereum network.
 * @function returnTokenBalance
 * @returns {string}
 */
export async function returnTokenBalance(tokenAddress: String): Promise<string> {

    const balance = await web3Main.eth.getBalance(tokenAddress, ((error: any, bal: any) => {
        if(error) {
            return error;
        } else {
            return bal;
        }
    }));

    return web3Main.utils.fromWei(balance,'ether');
}

/**
 * An async function that checks the decimal of a token on Ethereum blockchain and performs calculation based on the decimal of the token.
 * @function calculateDecimal
 * @returns {number}
 */
export async function calculateDecimal(tokenAddress: String, amount: Number): Promise<number> {

    // const contract = new web3Main.eth.Contract(abiERC20, tokenAddress);
    // const decimal = await contract.methods[METHODS.getDecimal]().call();
    return (amount.valueOf() / Math.pow(10, 18));
}