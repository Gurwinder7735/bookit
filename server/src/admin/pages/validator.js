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

  validator.add_update_page = { // "body" for post,put body parameters
      body: {
          accessor: joi.string().optional(),
          title: joi.string().optional(),
          content: joi.string().optional(),
          _id: joi.string().allow(null,"")
      },
    headers: authHeaderObj
  };

module.exports = validator;