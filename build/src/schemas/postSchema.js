'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.postData = void 0;
const Joi = require('joi');
/**
 * Exporting the schema for our POST payload.
 */
exports.postData = Joi.object({
    tokenAddress: Joi.string().token().required(),
    amount: Joi.number().min(0).required(),
    userAddress: Joi.string().token().required(),
});
