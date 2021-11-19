'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropDatabase = exports.createDatabase = void 0;
const tools = require('pgtools');
/**
 * A config object containing the credentials for postgres.
 *
 * @remarks
 * Notice the username and password may vary according to system.
 */
const config = {
    user: '',
    password: '',
    port: 5432,
    host: 'localhost'
};
/**
 * Creates a database 'web3js' in the system.
 * @function createDatabase
 * @returns {void}
 */
function createDatabase() {
    tools.createdb(config, 'web3js', function (err, res) {
        if (err) {
            console.error(err);
            process.exit(-1);
        }
        console.log(res);
    });
}
exports.createDatabase = createDatabase;
/**
 * Drops a database 'web3js' from the system.
 * @function dropDatabase
 * @returns {void}
 */
function dropDatabase() {
    tools.dropdb(config, 'web3js', function (err, res) {
        if (err) {
            console.error(err);
            process.exit(-1);
        }
        console.log(res);
    });
}
exports.dropDatabase = dropDatabase;
