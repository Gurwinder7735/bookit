'use strict';

const joi = require('joi');
const UniversalFunctions = require("../../../utils").universalFunctions;

const validator = {},
    failAction = UniversalFunctions.failActionFunction,
    authHeaderObj = UniversalFunctions.authorizationHeaderObj;

validator.login = { // "body" for post,put body parameters
    body: {
        email: joi.string().required(),
        password: joi.string().required(),
        device_token: joi.string().optional(),
        device_type: joi.number().optional()
    },
  headers: authHeaderObj
};

validator.edit_profile = { // "body" for post,put body parameters
    body: {
        firstName: joi.string().optional(),
        lastName: joi.string().optional(),
        image: joi.object({
          original: joi.string().optional(),
          thumbnail: joi.string().optional()
        })
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