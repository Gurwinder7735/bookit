'use strict';


// npm modules
const joi = require('joi');

// local modules
const UniversalFunctions = require('../../../utils').universalFunctions;

const validator = {},
    failAction = UniversalFunctions.failActionFunction,
    authHeaderObj = UniversalFunctions.authorizationHeaderObj;


// create appointment
validator.changePassword = {
    body: {
        oldPassword: joi.any().required(),
        newPassword: joi.string().required(),
    },
    headers: authHeaderObj
};

validator.forgotPassword = {
    body: {
        email: joi.any().required(),
    },
    headers: authHeaderObj
};


validator.signup = {
    body: {
        name: joi.any().required(),
        username: joi.string().required(),
        email: joi.string().required().email(),
        phoneNumber: joi.number().required(),
        countryCode: joi.number().required(),
        address: joi.string().required(),
        password: joi.any().required(),
        deviceType: joi.number().required().valid(1,2),
        deviceToken: joi.string().required(),
        location: joi.string().required(),
        coordinates : joi.array(),
        image : joi.object().keys({
           original: joi.string().required(),
           thumbnail: joi.string().required(),
        })
    },
    headers: authHeaderObj
};


validator.login = {
    body: {
        email: joi.string().required().email(),
        password: joi.any().required(),
        deviceToken: joi.string().required(),
        deviceType: joi.valid([1,2]),
        location: joi.string().required(),
        coordinates : joi.array(),
    },
    headers: authHeaderObj
};




module.exports = validator;
