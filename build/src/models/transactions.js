'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const { DataTypes } = require('sequelize');
const sequelize_1 = require("../config/sequelize");
/**
 * A transaction object containing the model for transaction table.
 */
exports.Transaction = sequelize_1.sequelizeDB.define('Transaction', {
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
}, {
    timestamps: false
});
