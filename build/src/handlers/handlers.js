'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalanceInfo = exports.getTokens = exports.withdrawFunds = exports.depositFunds = exports.approveFunds = void 0;
const ethereum_1 = require("../controllers/ethereum");
/**
 * An async function that calls 'Approve' function of smart contract to approve funds.
 * @param {Request} request
 * @param {Response} response
 * @function approveFunds
 * @returns {JSON}
 */
function approveFunds(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, ethereum_1.approveFundsContract)(request.query.tokenAddress, request.query.amount, request.query.userAddress);
    });
}
exports.approveFunds = approveFunds;
/**
 * An async function that calls 'Deposit' function of smart contract to deposit funds.
 * @param {Request} request
 * @param {Response} response
 * @function depositFunds
 * @returns {JSON}
 */
function depositFunds(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, ethereum_1.depositFundsContract)(request.query.tokenAddress, request.query.amount, request.query.userAddress);
    });
}
exports.depositFunds = depositFunds;
/**
 * An async function that calls 'Withdraw' function of smart contract to withdraw funds.
 * @param {Request} request
 * @param {Response} response
 * @function withdrawFunds
 * @returns {JSON}
 */
function withdrawFunds(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, ethereum_1.withdrawFundsContract)(request.query.tokenAddress, request.query.amount, request.query.userAddress);
    });
}
exports.withdrawFunds = withdrawFunds;
/**
 * An async function for obtaining a list of tokens from the exchange contract.
 * @param {Request} request
 * @param {Response} response
 * @function getTokens
 * @returns {JSON}
 */
function getTokens(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, ethereum_1.returnTokensList)();
    });
}
exports.getTokens = getTokens;
/**
 * An async function for obtaining information about a token from the BC.
 * @param {Request} request
 * @param {Response} response
 * @function getBalanceInfo
 * @returns {JSON}
 */
function getBalanceInfo(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let balance = yield (0, ethereum_1.returnTokenBalance)(request.query.tokenAddress);
        return JSON.parse(JSON.stringify(`{"Available Ether": ${balance}}`));
    });
}
exports.getBalanceInfo = getBalanceInfo;
/**
 * Exporting our functions.
 */
module.exports = {
    approveFunds,
    depositFunds,
    withdrawFunds,
    getTokens,
    getBalanceInfo
};
