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
exports.disconnectSequelize = exports.connectSequelize = exports.sequelizeDB = void 0;
const { Sequelize } = require('sequelize');
/**
 * Instantiating a sequelize object.
 *
 * @remarks
 * Notice the username and password may vary according to system.
 */
exports.sequelizeDB = new Sequelize('web3js', '', '', {
    host: 'localhost',
    dialect: 'postgres'
});
/**
 * An async function that checks a connection of sequelize to the database.
 * @function connectSequelize
 * @returns {void}
 */
function connectSequelize() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.sequelizeDB.authenticate();
            console.log('Connection to database has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
exports.connectSequelize = connectSequelize;
/**
 * A function that closes the connection of sequelize to the database.
 * @function disconnectSequelize
 * @returns {void}
 */
function disconnectSequelize() {
    try {
        exports.sequelizeDB.close().then(() => {
            console.log('Connection to database has been closed successfully.');
        });
    }
    catch (error) {
        console.error('Unable to close database:', error);
    }
}
exports.disconnectSequelize = disconnectSequelize;
