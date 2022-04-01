'use strict';
// momentTimezone = require('moment-timezone');
// const is = require("is_js");
const UniversalFunction = require('../../../utils/universal-functions');
const Constants = require('../../../config/appConstants');
// const paymentStatuses = require('./paymentStatuses.js')
// const schedule = require('node-schedule');
const Models = require('../../../models'),
  sendResponse = require('../../sendResponse'),
  RESPONSE_MESSAGES = require('../../../config/response-messages');

// local modules
// const Models = require('../../../models'),
//     Dao = require('../../../dao').queries,
//     controllerUtil = require('./controllerUtil'),
//     APP_CONSTANTS = require('../../../config/appConstants'),
//     RESPONSE_MESSAGES = require('../../../config/response-messages'),
//     UniversalFunctions = require('../../../utils').universalFunctions,
//     commonFunctions = require('../../../utils').commonController,
//     NotificationManager = require('../../../Lib/NotificationManager'),
//     CommonController = require('../../commonController'),
//     sendResponse = require('../../sendResponse'),
//     paymentGateway = require('../../paymentGateway');


module.exports = {


  add_update_page: async (req, res) => {
    try {

      var payload = req.body;
      console.log("payload ---------- ",payload)
      const options = { "upsert": true };
      const criteriaToMatch = { "accessor": payload.accessor };
      // const dataToUpdate = { "name": payload.name };
      var criteria = { "accessor": payload.accessor };

      if (payload._id && payload._id != "") {
        criteriaToMatch._id = { $ne: payload._id }
        criteria = { "_id": payload._id };
      }
      console.log(criteriaToMatch,"00000000000000000",criteria)
      Models.Pages.findOne(criteriaToMatch, function (err, result) {
        if (err) {
          return sendResponse.sendErrorMessage(500, req.headers.language, err, res);
        } else if (result && result != "") {
          return sendResponse.sendErrorMessage(403, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.PAGE_ACCESSOR_ALREADY_EXISTS, res);
        } else {
          delete payload._id
          Models.Pages.updateOne(criteria, payload, options, function (err, result) {
            if (err) {
              return sendResponse.sendErrorMessage(403, req.headers.language, err, res);
            } else {
              return sendResponse.sendSuccessData(result, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
            }
          })
        }
      })
    } catch (err) {
      console.log("555555555555555555555555",err)
      return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
    }
  },
  // add_add_update_pagepages: async (req, res) => {
  //   try {
  //     let payload=req.body

  //     if(payload.aboutUs){
  //       await Models.Pages.updateOne({accessor:'About Us'},{content:payload.aboutUs},function(err,result){
  //         if(err){
  //           return sendResponse.sendErrorMessageData(400,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.ERROR.DEFAULT,errDelete,res);

  //         }else{
  //           return sendResponse.sendSuccessData({}, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
  //         }
  //       })
  //     }
  //     if(payload.terms){
  //       await Models.Pages.updateOne({accessor:'Terms and Conditions'},{content:payload.terms},function(err,result){
  //         if(err){
  //           return sendResponse.sendErrorMessageData(400,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.ERROR.DEFAULT,errDelete,res);
  //         }else{
  //           return sendResponse.sendSuccessData({}, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
  //         }
  //       })
  //     }
  //     if(payload.privacyPolicy){
  //       await Models.Pages.updateOne({accessor:'Privacy Policy'},{content:payload.privacyPolicy},function(err,result){
  //         if(err){
  //           return sendResponse.sendErrorMessageData(400,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.ERROR.DEFAULT,errDelete,res);
  //         }else{
  //           return sendResponse.sendSuccessData({}, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
  //         }
  //       })
  //     }
      
      
      
     
  //   } catch (err) {
  //     console.log(err)
  //     return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
  //   }
  // },
  listing_pages:async(req,res)=>{
   
    
    await Models.Pages.find(function(err,result){
      if(err){
        return sendResponse.sendErrorMessageData(400,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.ERROR.DEFAULT,errDelete,res);
      }
      else{
        console.log("result --- ",result)
        return sendResponse.sendSuccessData(result, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
      }
    })

  }

 
 
};
