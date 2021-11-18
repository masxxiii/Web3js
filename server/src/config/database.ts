'use strict';
const tools = require('pgtools');
import { ConfigType } from '../exports/configTypes';

/**
 * A config object containing the credentials for postgres.
 *
 * @remarks
 * Notice the username and password may vary according to system.
 */
const config: ConfigType = {
    user: '',
    password: '',
    port: 5432,
    host: 'localhost'
}

/**
 * Creates a database 'web3js' in the system.
 * @function createDatabase
 * @returns {void}
 */
export function createDatabase(): void {
    tools.createdb(config, 'web3js', function (err: Error, res: Response) {
        if (err) {
            console.error(err);
            process.exit(-1);
        }
        console.log(res);
    });
}

/**
 * Drops a database 'web3js' from the system.
 * @function dropDatabase
 * @returns {void}
 */
export function dropDatabase(): void {
    tools.dropdb(config, 'web3js', function (err: Error, res: Response) {
        if (err) {
            console.error(err);
            process.exit(-1);
        }
        console.log(res);
    });
}