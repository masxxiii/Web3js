'use strict';
import {returnTokenBalance, returnTokensList, depositFundsContract, withdrawFundsContract, approveFundsContract } from "../controllers/ethereum";

/**
 * An async function that calls 'Approve' function of smart contract to approve funds.
 * @param {Request} request
 * @param {Response} response
 * @function approveFunds
 * @returns {JSON}
 */
export async function approveFunds (request: any, response: any) {

    return await approveFundsContract(request.query.tokenAddress, request.query.amount, request.query.userAddress);
}

/**
 * An async function that calls 'Deposit' function of smart contract to deposit funds.
 * @param {Request} request
 * @param {Response} response
 * @function depositFunds
 * @returns {JSON}
 */
export async function depositFunds (request: any, response: any) {

    return await depositFundsContract(request.query.tokenAddress, request.query.amount, request.query.userAddress);
}

/**
 * An async function that calls 'Withdraw' function of smart contract to withdraw funds.
 * @param {Request} request
 * @param {Response} response
 * @function withdrawFunds
 * @returns {JSON}
 */
export async function withdrawFunds (request: any, response: any) {

    return await withdrawFundsContract(request.query.tokenAddress, request.query.amount, request.query.userAddress);
}

/**
 * An async function for obtaining a list of tokens from the exchange contract.
 * @param {Request} request
 * @param {Response} response
 * @function getTokens
 * @returns {JSON}
 */
export async function getTokens (request: any, response: any) {

    return await returnTokensList();
}

/**
 * An async function for obtaining information about a token from the BC.
 * @param {Request} request
 * @param {Response} response
 * @function getBalanceInfo
 * @returns {JSON}
 */
export async function getBalanceInfo (request: any, response: any) {

    let balance = await returnTokenBalance(request.query.tokenAddress);

    return JSON.parse(JSON.stringify(`{"Available Ether": ${balance}}`));
}

/**
 * Exporting our functions.
 */
module.exports = {
    approveFunds,
    depositFunds,
    withdrawFunds,
    getTokens,
    getBalanceInfo
}