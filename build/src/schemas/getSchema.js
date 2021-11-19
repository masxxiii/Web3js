'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const Joi = require('joi');
/**
 * Exporting the schema for our get tokens response.
 */
exports.getData = Joi.array().items({
    list: Joi.string().required()
});
