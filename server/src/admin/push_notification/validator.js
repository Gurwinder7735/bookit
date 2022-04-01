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

validator.add_update_pushnotification = { 
  body: {
      message: joi.string().required(),
      _id: joi.string().optional()
      
  },
  headers: authHeaderObj
};

validator.delete_push = { // "body" for post,put body parameters
  query: { //use query for querystring as well as for path params
      id: joi.string().required()
  },
headers: authHeaderObj
};

module.exports = validator;