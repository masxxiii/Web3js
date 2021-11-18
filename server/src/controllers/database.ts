'use strict';
import { User } from "../models/users";
import { Wallet } from "../models/wallets";
import { Transaction } from "../models/transactions";

/**
 * An async function that checks a user in the database by MetaMask Address.
 * @function checkUserByAddress
 * @returns {any}
 */
export async function checkUserByAddress(userAddress: String): Promise<any> {

    return await User.findAll({
            where : { walletAddress: userAddress },
            raw: true
        }).then((data: any) => {
            return data;
        }).catch((err: any) => {
        console.log(err);
    });
}

/**
 * An async function that checks a wallet in the database by token Address and UserId.
 * @function checkWalletByAddress
 * @returns {any}
 */
export async function checkWalletByAddress(tokenAddress: String, userAddress: String): Promise<any> {

    /**
     * Finds user by address where parameter id is specified to be a string.
     */
    const user = <{ id: string }> (await User.findOne({ where : { walletAddress: userAddress  }, raw: true }));

    return await Wallet.findAll({
        where : { tokenAddress: tokenAddress, UserId: user.id },
        raw: true
    }).then((data: any) => {
        return data;
    }).catch((err: any) => {
        console.log(err);
    });
}

/**
 * An async function that creates a user in the database.
 * @function createUser
 * @returns {void}
 */
export async function createUser(userAddress: String): Promise<void> {

    const newUser = User.build({
        walletAddress: userAddress
    });
    await newUser.save();
}

/**
 * An async function that creates a wallet in the database related to user.
 * @function createWallet
 * @returns {void}
 */
export async function createWallet(tokenAddress: String, amount: Number, userAddress: String): Promise<void> {

    /**
     * Finds user by address where parameter id is specified to be a string.
     */
    const user = <{ id: string }> (await User.findOne({ where : { walletAddress: userAddress  }, raw: true }));

    if (!user) {
        console.error('Cannot find UserAddress');
        return;
    }

    await Wallet.create({
        tokenAddress: tokenAddress,
        balance: amount,
        UserId: user.id,
    });
}

/**
 * An async function that updates a wallet in the database when funds are deposited.
 * @function updateWalletDeposit
 * @returns {void}
 */
export async function updateWalletDeposit(tokenAddress: String, amount: number, userAddress: String): Promise<void> {

    /**
     * Finds user by address where parameter id is specified to be a string.
     * Finds wallet by tokenAddress and UserId and updates it
     */
    const user = <{ id: string }>(await User.findOne({where: {walletAddress: userAddress}, raw: true}));
    const wallet = await Wallet.findOne({where: {tokenAddress: tokenAddress, UserId: user.id}, raw: true});

    const newAmount: number = (parseFloat(wallet.balance) + amount);

    await Wallet.update({ balance: newAmount }, {
        where: {
            tokenAddress: tokenAddress,
            UserId: user.id
        }
    });
}

/**
 * An async function that updates a wallet in the database when funds are withdrawn.
 * @function updateWalletWithdraw
 * @returns {void}
 */
export async function updateWalletWithdraw(tokenAddress: String, amount: number, userAddress: String): Promise<void> {

    /**
     * Finds user by address where parameter id is specified to be a string.
     * Finds wallet by tokenAddress and UserId and updates it
     */
    const user = <{ id: string }>(await User.findOne({where: {walletAddress: userAddress}, raw: true}));
    const wallet = await Wallet.findOne({where: {tokenAddress: tokenAddress, UserId: user.id}, raw: true});

    const newAmount: number = (parseFloat(wallet.balance) - amount);
    if(newAmount > 0) {
        await Wallet.update({ balance: newAmount }, {
            where: {
                tokenAddress: tokenAddress,
                UserId: user.id
            }
        });
    } else {
        console.log("No balance!");
    }
}

/**
 * An async function that logs transactions.
 * @function logData
 * @returns {void}
 */
export async function logData(walletAddress: String, tokenAddress: String, deposit: number, withdraw: number): Promise<void> {

    const log: Date = new Date();
    const date: string = log.getDate() +'/'+ log.getMonth() +'/'+ log.getFullYear();
    const time: string = log.getHours() +'-'+ log.getMinutes() +'-'+ log.getSeconds();
    await Transaction.create({
        walletAddress: walletAddress,
        tokenAddress: tokenAddress,
        deposit: deposit,
        withdraw: withdraw,
        time: time,
        date: date
    });
}