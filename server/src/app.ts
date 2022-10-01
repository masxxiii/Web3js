'use strict';
import {eventListener} from "./listeners/listener";

const Hapi = require('@hapi/hapi');
const routes = require('../src/routes/routes');
import { createDatabase } from "./config/database";
import { createTables } from './config/createTables';
import  { connectSequelize, disconnectSequelize } from "./config/sequelize";


/**
 * An async initializer that creates server on port 3000.
 */
const startServer = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.start();

    //connecting our routes
    await server.route(routes);
    console.log('Server running on %s', server.info.uri);

    //Internal function calls
    // await createDatabase();
    // await createTables();
    await connectSequelize();

    //connecting our listeners
    await eventListener();
};

/**
 * Emits an event whenever a promise is rejected and catches error
 */
process.on('unhandledRejection', (err) => {

    console.log(err);
    disconnectSequelize();
    process.exit(1);
});

/**
 * Starting the server.
 */
startServer().then(() => {
    console.log('Server Started');
});
