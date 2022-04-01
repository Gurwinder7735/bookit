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

validator.add = { // "body" for post,put body parameters
    body: {
        name: joi.string().required(),
        image: joi.object({
            original: joi.string().required(),
            thumbnail: joi.string().allow(null, ''),
            image: joi.string().allow(null, ''),
            fileName: joi.string().allow(null, ''),
            file_type: joi.string().allow(null, '')
        }).required(),
        category: joi.string().required(),
    },
    headers: authHeaderObj
};

validator.update = { // "body" for post,put body parameters
    params: { //use query for querystring as well as for path params
        id: joi.string().required()
    },
    body: {
        name: joi.string().optional(),
        image: joi.object({
            original: joi.optional(),
            thumbnail:joi.optional(),
            image:joi.optional(),
            fileName:joi.optional(),
            file_type:joi.optional(),
        }).optional(),
        status: joi.optional(),
        category: joi.optional(),
    },
    headers: authHeaderObj
};

validator.listing = { // "body" for post,put body parameters
    query: {
        name: joi.string().required()
    },
    headers: authHeaderObj
};

validator.delete = { // "body" for post,put body parameters
    params: { //use query for querystring as well as for path params
        id: joi.string().required()
    },
    headers: authHeaderObj
};


module.exports = validator;