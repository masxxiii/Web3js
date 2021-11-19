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
exports.calculateDecimal = exports.checkDatabase = exports.returnTokenBalance = exports.returnTokensList = exports.approveFundsContract = exports.withdrawFundsContract = exports.depositFundsContract = void 0;
let Web3 = require('web3');
const abi_1 = require("../contracts/abi");
const abiERC20_1 = require("../contracts/abiERC20");
const methodsOfContracts_1 = require("../contracts/methodsOfContracts");
const database_1 = require("./database");
/**
 * An api key from the 'Infura' network for Testnet.
 */
const url1 = 'https://rinkeby.infura.io/v3/02944e93a8fc48cb8796c7fa43e0e29f';
/**
 * An api key from the 'Infura' network for MainNet.
 */
const url2 = 'https://mainnet.infura.io/v3/02944e93a8fc48cb8796c7fa43e0e29f';
/**
 * The private key from of your account on metamask.
 */
const privateKey = '5e1b1670385b97db3af50432729bce55d071e28599b37a279bc019d92fa7fc02';
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
function depositFundsContract(tokenAddress, amount, userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const contract = new web3Test.eth.Contract(abi_1.abi, address);
        let message;
        try {
            const gasPrice = yield web3Test.eth.getGasPrice();
            const gas = yield contract.methods.deposit(amount.toString(), tokenAddress).estimateGas({ from: userAddress });
            yield contract.methods.deposit(amount.toString(), tokenAddress).send({
                from: userAddress,
                gasPrice: gasPrice,
                gas: gas
            });
            // const ans: boolean = await depositListener(tokenAddress,amount,userAddress);
            // if(ans) {
            //     message = 'Amount deposit successfully.';
            // } else {
            //     message = 'Failed to deposit amount.';
            // }
        }
        catch (error) {
            // message = 'Error!'
            console.log(error);
        }
        return 'message';
    });
}
exports.depositFundsContract = depositFundsContract;
/**
 * An async function that withdraws funds from the smart contract.
 * @function withdrawFundsContract
 * @returns {string}
 */
function withdrawFundsContract(tokenAddress, amount, userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const contract = new web3Test.eth.Contract(abi_1.abi, address);
        let message;
        try {
            const gasPrice = yield web3Test.eth.getGasPrice();
            const gas = yield contract.methods.withdraw(amount.toString(), tokenAddress).estimateGas({ from: userAddress });
            yield contract.methods.withdraw(amount.toString(), tokenAddress).send({
                from: userAddress,
                gasPrice: gasPrice,
                gas: gas
            });
            // const ans: boolean = await withdrawListener(tokenAddress,amount,userAddress);
            // if(ans) {
            //     message = 'Amount withdrawn successfully.';
            // } else {
            //     message = 'Failed to withdraw amount.'
            // }
        }
        catch (error) {
            // message = 'Error!';
            console.log(error);
        }
        return 'message';
    });
}
exports.withdrawFundsContract = withdrawFundsContract;
/**
 * An async function that calls function approve from the smart contract.
 * @function approveFunds
 * @returns {string}
 */
function approveFundsContract(tokenAddress, amount, userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        if (web3Test.utils.isAddress(tokenAddress)) {
            const contract = new web3Main.eth.Contract(abiERC20_1.abiERC20, address);
            try {
                const gasPrice = yield web3Test.eth.getGasPrice();
                const gasEstimate = yield contract.methods[methodsOfContracts_1.METHODS.approve](userAddress, amount).estimateGas({ from: account.address });
                const reply = yield contract.methods[methodsOfContracts_1.METHODS.approve](account.address, amount).send({
                    from: account.address,
                    gasPrice: gasPrice,
                    gas: gasEstimate
                });
                if (reply) {
                    return 'Funds Approved!';
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            return 'Token not found on the Ethereum Blockchain!';
        }
    });
}
exports.approveFundsContract = approveFundsContract;
/**
 * An async function that returns the list of tokens from the specified exchange contract.
 * @function returnTokensList
 * @returns {string}
 */
function returnTokensList() {
    return __awaiter(this, void 0, void 0, function* () {
        if (web3Main.utils.isAddress(address)) {
            const contract = new web3Test.eth.Contract(abi_1.abi, address);
            return yield contract.methods[methodsOfContracts_1.METHODS.getListTokens]().call();
        }
        else {
            return 'Address not found on the Ethereum Blockchain!';
        }
    });
}
exports.returnTokensList = returnTokensList;
/**
 * An async function that returns the balance of a token in 'Ether' from the main Ethereum network.
 * @function returnTokenBalance
 * @returns {string}
 */
function returnTokenBalance(tokenAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const balance = yield web3Main.eth.getBalance(tokenAddress, ((error, bal) => {
            if (error) {
                return error;
            }
            else {
                return bal;
            }
        }));
        return web3Main.utils.fromWei(balance, 'ether');
    });
}
exports.returnTokenBalance = returnTokenBalance;
/**
 * An async function that checks the database if user and wallet exists.
 * @function checkDatabase
 * @returns {boolean}
 */
function checkDatabase(tokenAddress, userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Checks if the Ethereum address is valid. Then performs a query and checks if user and wallet exists.
         * If the responses are empty a new user and a new wallet are created.
         */
        if (web3Main.utils.isAddress(tokenAddress)) {
            const res1 = yield (0, database_1.checkUserByAddress)(userAddress);
            if (res1.length === 0) {
                yield (0, database_1.createUser)(userAddress);
            }
            const res2 = yield (0, database_1.checkWalletByAddress)(tokenAddress, userAddress);
            if (res2.length === 0) {
                yield (0, database_1.createWallet)(tokenAddress, 0, userAddress);
            }
            return true;
        }
        else {
            return false;
        }
    });
}
exports.checkDatabase = checkDatabase;
/**
 * An async function that checks the decimal of a token on Ethereum blockchain and performs calculation based on the decimal of the token.
 * @function calculateDecimal
 * @returns {number}
 */
function calculateDecimal(tokenAddress, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        // const contract = new web3Main.eth.Contract(abiERC20, tokenAddress);
        // const decimal = await contract.methods[METHODS.getDecimal]().call();
        return (amount.valueOf() / Math.pow(10, 18));
    });
}
exports.calculateDecimal = calculateDecimal;
