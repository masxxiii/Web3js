'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const { DataTypes } = require('sequelize');
const sequelize_1 = require("../config/sequelize");
/**
 * A user object containing the model for user table.
 */
exports.User = sequelize_1.sequelizeDB.define('User', {
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
}, {
    timestamps: false
});
