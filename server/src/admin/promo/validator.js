'use strict';

// constants
const CONSTANTS = require("../../../config/appConstants");

// npm modules
const joi = require('joi');

// local modules
const UniversalFunctions = require("../../../utils").universalFunctions;

const validator = {},
    failAction = UniversalFunctions.failActionFunction,
    authHeaderObj = UniversalFunctions.authorizationHeaderObj;

validator.add_update_promo = { // "body" for post,put body parameters
    body: {
        name: joi.string().optional(),
        code: joi.string().optional(),
        type: joi.number().optional(),
        amount: joi.string().optional(),
        minOrderTotal: joi.string().optional(),
        startDate: joi.string().optional(),
        endDate: joi.string().optional(),
        isShippingFree: joi.boolean().optional(),
        timesAllowed: joi.number().optional(),
        forSpecificProducts: joi.boolean().optional(),
        productId: joi.array().items(joi.string()).optional(),
        forSpecificCategories: joi.boolean().optional(),
        categoryId: joi.array().items(joi.string()).optional(),

        _id: joi.string().allow(null, '')
    },
    headers: authHeaderObj
};
validator.list_promo = { // "body" for post,put body parameters
    query: {
        name: joi.string().required()
    },
    headers: authHeaderObj
};

validator.delete_promo = { // "body" for post,put body parameters
    query: { //use query for querystring as well as for path params
        id: joi.string().required()
    },
    headers: authHeaderObj
};
module.exports = validator;