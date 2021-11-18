'use strict';
const { DataTypes } = require('sequelize');
import { sequelizeDB } from "../config/sequelize";

/**
 * A wallet object containing the model for wallet table.
 */
export const Wallet = sequelizeDB.define('Wallet', {
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
},{
    timestamps: false
})