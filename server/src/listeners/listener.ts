'use strict';

import { logData, updateWalletDeposit, updateWalletWithdraw } from "../controllers/database";

let Web3 = require('web3');
import {abi} from "../contracts/abi";
import {calculateDecimal, checkDatabase} from "../controllers/ethereum";

/**
 * An api key from the 'Infura' network for Testnet.
 */
const url1 = 'https://rinkeby.infura.io/v3/02944e93a8fc48cb8796c7fa43e0e29f'

/**
 * Initializing our web3 objects for contacting with Ethereum block chain.
 */
const web3Test = new Web3(url1);

/**
 * Address of our account
 */
const address = '0x9F637286498b52f63e7C43BB758214C52F2D6E1b';

/**
 * An async function that listens to deposit and withdraw events on blockchain and checks if our transaction was done.
 * @function eventListener
 * @returns {null}
 */
export async function eventListener(): Promise<void> {

    const contract = new web3Test.eth.Contract(abi,address);
    let user: string = "";
    let token: string = "";
    let amount: string = "";

    await contract.events.allEvents({fromBlock: "latest"}, async (err: any, event: any) => {

        if(!err) {

            if(event.event === 'Deposit') {
                console.log(event);
                user = event.returnValues.addressOwner;
                token = event.returnValues.addressToken;
                amount = event.returnValues.amount;
                const reply: boolean = await checkDatabase(token,user);
                if (reply) {
                    const amountCalculated = await calculateDecimal(token,parseInt(amount));
                    await updateWalletDeposit(token,amountCalculated,user);
                    await logData(user,token,amountCalculated,0);
                }
            }

            if(event.event === 'Withdraw') {
                console.log(event);
                user = event.returnValues.addressOwner;
                token = event.returnValues.addressToken;
                amount = event.returnValues.amount;
                const reply: boolean = await checkDatabase(token,user);
                if (reply) {
                    const amountCalculated = await calculateDecimal(token,parseInt(amount));
                    await updateWalletWithdraw(token,amountCalculated,user);
                    await logData(user,token,0,amountCalculated);
                }
            }

        } else {
            console.log(err);
        }
    });
}