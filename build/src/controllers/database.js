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
exports.logData = exports.updateWalletWithdraw = exports.updateWalletDeposit = exports.createWallet = exports.createUser = exports.checkWalletByAddress = exports.checkUserByAddress = void 0;
const users_1 = require("../models/users");
const wallets_1 = require("../models/wallets");
const transactions_1 = require("../models/transactions");
/**
 * An async function that checks a user in the database by MetaMask Address.
 * @function checkUserByAddress
 * @returns {any}
 */
function checkUserByAddress(userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users_1.User.findAll({
            where: { walletAddress: userAddress },
            raw: true
        }).then((data) => {
            return data;
        }).catch((err) => {
            console.log(err);
        });
    });
}
exports.checkUserByAddress = checkUserByAddress;
/**
 * An async function that checks a wallet in the database by token Address and UserId.
 * @function checkWalletByAddress
 * @returns {any}
 */
function checkWalletByAddress(tokenAddress, userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Finds user by address where parameter id is specified to be a string.
         */
        const user = (yield users_1.User.findOne({ where: { walletAddress: userAddress }, raw: true }));
        return yield wallets_1.Wallet.findAll({
            where: { tokenAddress: tokenAddress, UserId: user.id },
            raw: true
        }).then((data) => {
            return data;
        }).catch((err) => {
            console.log(err);
        });
    });
}
exports.checkWalletByAddress = checkWalletByAddress;
/**
 * An async function that creates a user in the database.
 * @function createUser
 * @returns {void}
 */
function createUser(userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = users_1.User.build({
            walletAddress: userAddress
        });
        yield newUser.save();
    });
}
exports.createUser = createUser;
/**
 * An async function that creates a wallet in the database related to user.
 * @function createWallet
 * @returns {void}
 */
function createWallet(tokenAddress, amount, userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Finds user by address where parameter id is specified to be a string.
         */
        const user = (yield users_1.User.findOne({ where: { walletAddress: userAddress }, raw: true }));
        if (!user) {
            console.error('Cannot find UserAddress');
            return;
        }
        yield wallets_1.Wallet.create({
            tokenAddress: tokenAddress,
            balance: amount,
            UserId: user.id,
        });
    });
}
exports.createWallet = createWallet;
/**
 * An async function that updates a wallet in the database when funds are deposited.
 * @function updateWalletDeposit
 * @returns {void}
 */
function updateWalletDeposit(tokenAddress, amount, userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Finds user by address where parameter id is specified to be a string.
         * Finds wallet by tokenAddress and UserId and updates it
         */
        const user = (yield users_1.User.findOne({ where: { walletAddress: userAddress }, raw: true }));
        const wallet = yield wallets_1.Wallet.findOne({ where: { tokenAddress: tokenAddress, UserId: user.id }, raw: true });
        const newAmount = (parseFloat(wallet.balance) + amount);
        yield wallets_1.Wallet.update({ balance: newAmount }, {
            where: {
                tokenAddress: tokenAddress,
                UserId: user.id
            }
        });
    });
}
exports.updateWalletDeposit = updateWalletDeposit;
/**
 * An async function that updates a wallet in the database when funds are withdrawn.
 * @function updateWalletWithdraw
 * @returns {void}
 */
function updateWalletWithdraw(tokenAddress, amount, userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Finds user by address where parameter id is specified to be a string.
         * Finds wallet by tokenAddress and UserId and updates it
         */
        const user = (yield users_1.User.findOne({ where: { walletAddress: userAddress }, raw: true }));
        const wallet = yield wallets_1.Wallet.findOne({ where: { tokenAddress: tokenAddress, UserId: user.id }, raw: true });
        const newAmount = (parseFloat(wallet.balance) - amount);
        if (newAmount > 0) {
            yield wallets_1.Wallet.update({ balance: newAmount }, {
                where: {
                    tokenAddress: tokenAddress,
                    UserId: user.id
                }
            });
        }
        else {
            console.log("No balance!");
        }
    });
}
exports.updateWalletWithdraw = updateWalletWithdraw;
/**
 * An async function that logs transactions.
 * @function logData
 * @returns {void}
 */
function logData(walletAddress, tokenAddress, deposit, withdraw) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = new Date();
        const date = log.getDate() + '/' + log.getMonth() + '/' + log.getFullYear();
        const time = log.getHours() + '-' + log.getMinutes() + '-' + log.getSeconds();
        yield transactions_1.Transaction.create({
            walletAddress: walletAddress,
            tokenAddress: tokenAddress,
            deposit: deposit,
            withdraw: withdraw,
            time: time,
            date: date
        });
    });
}
exports.logData = logData;
