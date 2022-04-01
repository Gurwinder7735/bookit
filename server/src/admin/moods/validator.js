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
        image: joi.object({
            original: joi.string().required(),
            thumbnail: joi.string().required()
        }).optional(),
        _id: joi.string().allow(null, '')
    },
    headers: authHeaderObj
};
validator.moods_list = { // "body" for post,put body parameters
    query: {
        name: joi.string().required()
    },
  headers: authHeaderObj
};
validator.change_password = { // "body" for post,put body parameters
    body: {
        password: joi.string().required(),
        new_password: joi.string().required(),
        confirm_password: joi.string().required()
    },
  headers: authHeaderObj
};

validator.moods_delete = { // "body" for post,put body parameters
  query: { //use query for querystring as well as for path params
      id: joi.string().required()
  },
headers: authHeaderObj
};

validator.listCourses = { // "query" for url query parameters
  query: {
      searchUser: joi.string().optional(),
      category: joi.string().optional(),
      lastId: joi.string().optional(),
      count: joi.string().optional()
  },
  headers: authHeaderObj
};

module.exports = validator;