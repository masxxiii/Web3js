'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const handler = require('../handlers/handlers');
const postSchema_1 = require("../schemas/postSchema");
const getSchema_1 = require("../schemas/getSchema");
/**
 * Exporting the different routes of our server.
 */
module.exports = [
    {
        method: 'POST',
        path: '/approve/',
        handler: handler.approveFunds,
        options: {
            description: 'This endpoint will approve funds',
            validate: {
                query: postSchema_1.postData
            }
        }
    },
    {
        method: 'POST',
        path: '/deposit/',
        handler: handler.depositFunds,
        options: {
            description: 'This endpoint will deposit funds',
            validate: {
                query: postSchema_1.postData
            }
        }
    },
    {
        method: 'POST',
        path: '/withdraw/',
        handler: handler.withdrawFunds,
        options: {
            description: 'This endpoint will withdraw funds',
            validate: {
                query: postSchema_1.postData
            }
        }
    },
    {
        method: 'GET',
        path: '/tokens',
        handler: handler.getTokens,
        options: {
            description: 'This endpoint will fetch list of tokens',
            response: {
                schema: getSchema_1.getData,
                failAction: 'log'
            }
        }
    },
    {
        method: 'GET',
        path: '/balanceInfo',
        handler: handler.getBalanceInfo,
        options: {
            description: 'This endpoint will fetch balance info of a token',
        }
    }
];
