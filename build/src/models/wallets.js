'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const { DataTypes } = require('sequelize');
const sequelize_1 = require("../config/sequelize");
/**
 * A wallet object containing the model for wallet table.
 */
exports.Wallet = sequelize_1.sequelizeDB.define('Wallet', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    tokenAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    UserId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
}, {
    timestamps: false
});
