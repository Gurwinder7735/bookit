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


validator.add_update_mood = { // "body" for post,put body parameters
    body: {
        name: joi.string().optional(),
        email: joi.string().optional(),
        countryCode: joi.string().optional(),
        phone: joi.string().optional(),
        password: joi.string().optional(),
        image: joi.object({
            original: joi.string().required(),
            thumbnail: joi.string().required()
        }).optional(),
        coverImage: joi.object({
            original: joi.string().required(),
            thumbnail: joi.string().required()
        }).optional(),
        _id: joi.string().optional()
    },
    headers: authHeaderObj
};
validator.users_delete = { // "body" for post,put body parameters
    query: { //use query for querystring as well as for path params
        id: joi.string().required()
    },
    headers: authHeaderObj
};

validator.list_users = { // "body" for post,put body parameters
    query: { //use query for querystring as well as for path params
        q: joi.string().allow(null,"")
    },
    headers: authHeaderObj
};





module.exports = validator;