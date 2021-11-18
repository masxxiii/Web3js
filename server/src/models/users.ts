'use strict';
const { DataTypes } = require('sequelize');
import { sequelizeDB } from "../config/sequelize";

/**
 * A user object containing the model for user table.
 */
export const User = sequelizeDB.define('User', {
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
},{
    timestamps: false
})