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
const listener_1 = require("./listeners/listener");
const Hapi = require('@hapi/hapi');
const routes = require('../src/routes/routes');
const sequelize_1 = require("./config/sequelize");
/**
 * An async initializer that creates server on port 3000.
 */
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    yield server.start();
    //connecting our routes
    yield server.route(routes);
    console.log('Server running on %s', server.info.uri);
    //Internal function calls
    // await createDatabase();
    // await createTables();
    yield (0, sequelize_1.connectSequelize)();
    //connecting our listeners
    yield (0, listener_1.eventListener)();
});
/**
 * Emits an event whenever a promise is rejected and catches error
 */
process.on('unhandledRejection', (err) => {
    console.log(err);
    (0, sequelize_1.disconnectSequelize)();
    process.exit(1);
});
/**
 * Starting the server.
 */
startServer().then(() => {
    console.log('Server Started.');
});
