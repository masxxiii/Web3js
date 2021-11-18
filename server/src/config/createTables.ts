'use strict';
import { User } from "../models/users";
import { Wallet } from "../models/wallets";
import { Transaction } from "../models/transactions";
import { DataTypes } from "sequelize";

/**
 * Async function that assigns a relationship to User model and creates a table 'Users' in the database.
 * @function createUsersTable
 * @returns {void}
 */
async function createUsersTable(): Promise<void> {
    User.hasMany(Wallet, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false
        }
    });
    await User.sync();
}

/**
 * Async function that assigns a relationship to Wallet model and creates a table 'Wallets' in the database.
 * @function createWalletsTable
 * @returns {void}
 */
async function createWalletsTable(): Promise<void> {
    Wallet.belongsTo(User);
    await Wallet.sync();
}

/**
 * Async function that creates a table 'Transactions' in the database.
 * @function createTransactionsTable
 * @returns {void}
 */
async function createTransactionsTable(): Promise<void> {
    await Transaction.sync();
}

/**
 * Async function that calls the createTable functions.
 * @function createTables
 * @returns {void}
 */
export async function createTables(): Promise<void> {
    await createUsersTable();
    await createWalletsTable();
    await createTransactionsTable();
}