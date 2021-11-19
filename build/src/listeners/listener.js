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
exports.depositListener = exports.eventListener = void 0;
const database_1 = require("../controllers/database");
let Web3 = require('web3');
const abi_1 = require("../contracts/abi");
const ethereum_1 = require("../controllers/ethereum");
/**
 * An api key from the 'Infura' network for Testnet.
 */
const url1 = 'https://rinkeby.infura.io/v3/02944e93a8fc48cb8796c7fa43e0e29f';
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
 * @returns {boolean}
 */
function eventListener() {
    return __awaiter(this, void 0, void 0, function* () {
        const contract = new web3Test.eth.Contract(abi_1.abi, address);
        let data = undefined;
        yield contract.events.allEvents({ fromBlock: "latest" }, (err, event) => __awaiter(this, void 0, void 0, function* () {
            if (!err) {
                if (event.event === 'Matching') {
                    console.log(event);
                }
            }
        }));
    });
}
exports.eventListener = eventListener;
/**
 * An async function that listens to deposit events on blockchain and checks if our transaction was done.
 * @function depositListener
 * @returns {boolean}
 */
function depositListener(tokenAddress, amount, userAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const contract = new web3Test.eth.Contract(abi_1.abi, address);
        let data = undefined;
        yield contract.getPastEvents('Deposit', { fromBlock: "earliest",
            toBlock: "latest"
        }, (err, events) => {
            if (!err) {
                let temp;
                temp = events.length;
                data = events[temp - 1].returnValues.addressOwner;
            }
        });
        /**
         * Checks if the latest deposit event on blockchain has the same address as our userAddress
         */
        if (data === userAddress) {
            const reply = yield (0, ethereum_1.checkDatabase)(tokenAddress, userAddress);
            if (reply) {
                const amountCalculated = yield (0, ethereum_1.calculateDecimal)(tokenAddress, amount);
                yield (0, database_1.updateWalletDeposit)(tokenAddress, amountCalculated, userAddress);
                yield (0, database_1.logData)(userAddress, tokenAddress, amountCalculated, 0);
            }
            return true;
        }
        else {
            return false;
        }
    });
}
exports.depositListener = depositListener;
