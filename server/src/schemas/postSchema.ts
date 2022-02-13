'use strict';
const Joi = require('joi');

/**
 * Exporting the schema for our POST payload.
 */
export const postData = Joi.object({
    tokenAddress:
        Joi.string().token().required(),
    amount:
        Joi.number().min(0).required(),
    userAddress:
        Joi.string().token().required(),
});
