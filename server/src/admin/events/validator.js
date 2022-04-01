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

validator.add_update_event = { // "body" for post,put body parameters
    body: {
        name: joi.string().optional(),
        description: joi.string().optional(),
        eventTime: joi.string().optional(),
        dressCode: joi.string().optional(),
        eventType: joi.number().optional(),
        location: joi.string().optional(),
        address: joi.string().optional(),
        userId: joi.string().optional(),
        image: joi.object({
          original: joi.string().required(),
          thumbnail: joi.string().required()
        }).optional(),
        _id: joi.string().allow(null,'') //required in case of edit event
    },
    headers: authHeaderObj
};
validator.events_delete = { // "body" for post,put body parameters
    query: { //use query for querystring as well as for path params
        id: joi.string().required()
    },
  headers: authHeaderObj
};

module.exports = validator;