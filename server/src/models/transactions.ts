'use strict';
const { DataTypes } = require('sequelize');
import { sequelizeDB } from "../config/sequelize";

/**
 * A transaction object containing the model for transaction table.
 */
export const Transaction = sequelizeDB.define('Transaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    walletAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tokenAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deposit: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    withdraw: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
})