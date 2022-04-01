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

validator.file_upload = { // "body" for post,put body parameters
    body: {
        type: joi.string().optional().allow(''),
        folder: joi.string().optional().allow(''),
        image: joi.any().optional().allow('').description('image file')
    },
    headers: authHeaderObj
};


module.exports = validator;