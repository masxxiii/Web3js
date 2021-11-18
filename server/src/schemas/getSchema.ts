'use strict';
const Joi = require('joi');

/**
 * Exporting the schema for our get tokens response.
 */
export const getData = Joi.array().items({
    list:
        Joi.string().required()
});