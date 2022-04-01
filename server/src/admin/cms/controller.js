"use strict";
// momentTimezone = require('moment-timezone');
// const is = require("is_js");
const UniversalFunction = require("../../../utils/universal-functions");
const Constants = require("../../../config/appConstants");
// const paymentStatuses = require('./paymentStatuses.js')
// const schedule = require('node-schedule');
const Models = require("../../../models"),
  sendResponse = require("../../sendResponse"),
  RESPONSE_MESSAGES = require("../../../config/response-messages");

module.exports = {
  
  getCMS: async (req, res) => {
      
    try {
        
      const { type } = req.params;
      let condition = {};
      let title = ''

      if (type == 1) {
        condition = {
          accessor: "terms",
        };
        title = "Terms & Conditions";
      }
      if (type == 2) {
        condition = {
          accessor: "privacy",
        };
        title = "Privacy policy";
      }
      if (type == 3) {
        condition = {
          accessor: "about_us",
        };
        title = "About Us";
      }

      let content = await Models.Contents.findOne(condition);

      return sendResponse.sendSuccessData(
        content,
        200,
        req.headers.language,
        RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
        res
      );

    } catch (err) {

        console.log('ERR',err);
      return sendResponse.sendErrorMessage(
        500,
        req.headers.language,
        RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR,
        res
      );
    }
  },

  updateCMS: async (req, res) => {

    try {

        const { type } = req.params;
        let condition = {};
        let title = '   '
      
        if (type == 1) {
          condition = {
            accessor: "terms",
          };
          title = "Terms & Conditions";
        }
        if (type == 2) {
          condition = {
            accessor: "privacy",
          };
          title = "Privacy Policy";
        }
        if (type == 3) {
          condition = {
            accessor: "about_us",
          };
          title = "About Us";
        }
      
        console.log('req.body',req.body.content)
        let content = await Models.Contents.findOneAndUpdate(condition,{ value: req.body.content },{ new: true } );
  
        return sendResponse.sendSuccessData(
            content,
            200,
            req.headers.language,
            RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
            res
          );
      



    } catch (err) {
      return sendResponse.sendErrorMessage(
        500,
        req.headers.language,
        RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR,
        res
      );
    }

  },
};
