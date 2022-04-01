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

validator.add_category = { // "body" for post,put body parameters
    body: {
        name: joi.string().required(),
        image: joi.object({
            original: joi.string().required(),
            thumbnail: joi.string().allow(null, '')
        }).required(),
    },
    headers: authHeaderObj
};

validator.update_category = { // "body" for post,put body parameters
    body: {
        name: joi.string().optional(),
        image: joi.object({
            original: joi.optional(),
            thumbnail:joi.optional(),
        }).optional(),
        _id: joi.string().required()
    },
    headers: authHeaderObj
};

validator.moods_list = { // "body" for post,put body parameters
    query: {
        name: joi.string().required()
    },
    headers: authHeaderObj
};

validator.category_delete = { // "body" for post,put body parameters
    query: { //use query for querystring as well as for path params
        id: joi.string().required()
    },
    headers: authHeaderObj
};


module.exports = validator;