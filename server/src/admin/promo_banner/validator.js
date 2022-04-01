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

validator.add_update_banner = { // "body" for post,put body parameters
    body: {
        name: joi.string().optional(),
        image: joi.object({
            original: joi.string().required(),
            thumbnail: joi.string().required()
        }).optional(),
        _id: joi.string().allow(null, '')
    },
    headers: authHeaderObj
};
validator.list_banner = { // "body" for post,put body parameters
    query: {
        name: joi.string().required()
    },
    headers: authHeaderObj
};
validator.delete_banner = { // "body" for post,put body parameters
    query: { //use query for querystring as well as for path params
        id: joi.string().required()
    },
    headers: authHeaderObj
};
module.exports = validator;