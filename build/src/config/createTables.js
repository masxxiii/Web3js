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
exports.createTables = void 0;
const users_1 = require("../models/users");
const wallets_1 = require("../models/wallets");
const transactions_1 = require("../models/transactions");
const sequelize_1 = require("sequelize");
/**
 * Async function that assigns a relationship to User model and creates a table 'Users' in the database.
 * @function createUsersTable
 * @returns {void}
 */
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        users_1.User.hasMany(wallets_1.Wallet, {
            foreignKey: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false
            }
        });
        yield users_1.User.sync();
    });
}
/**
 * Async function that assigns a relationship to Wallet model and creates a table 'Wallets' in the database.
 * @function createWalletsTable
 * @returns {void}
 */
function createWalletsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        wallets_1.Wallet.belongsTo(users_1.User);
        yield wallets_1.Wallet.sync();
    });
}
/**
 * Async function that creates a table 'Transactions' in the database.
 * @function createTransactionsTable
 * @returns {void}
 */
function createTransactionsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield transactions_1.Transaction.sync();
    });
}
/**
 * Async function that calls the createTable functions.
 * @function createTables
 * @returns {void}
 */
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createUsersTable();
        yield createWalletsTable();
        yield createTransactionsTable();
    });
}
exports.createTables = createTables;
