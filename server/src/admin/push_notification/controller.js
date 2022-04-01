'use strict';
    // momentTimezone = require('moment-timezone');
// const is = require("is_js");
const UniversalFunction = require('../../../utils/universal-functions');
const Constants         = require('../../../config/appConstants');
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

    add_update_push_notf: async (req, res) => {
        try {
    
          var payload = req.body;
          console.log("payload ---------- ",payload)
        //   const options = { "upsert": true };
        //   const criteriaToMatch = { "name": payload.name };
        //   // const dataToUpdate = { "name": payload.name };
        //   var criteria = { "name": payload.name };
    
        //   if (payload._id && payload._id != "") {
        //     criteriaToMatch._id = { $ne: payload._id }
        //     criteria = { "_id": payload._id };
        //   }
        //   console.log(criteriaToMatch,"00000000000000000",criteria)
        //   Models.Moods.findOne(criteriaToMatch, function (err, result) {
        //     if (err) {
        //       return sendResponse.sendErrorMessage(500, req.headers.language, err, res);
        //     } else if (result && result != "") {
        //       return sendResponse.sendErrorMessage(403, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.MOOD_ALREADY_EXISTS, res);
        //     } else {
        //       delete payload._id
            
            //Models.Moods.updateOne(criteria, payload, options, function (err, result) {
            var pushData = new Models.PushNotf({
                message:payload.message
            })
            pushData.save(function(err, result){
                if (err) {
                  return sendResponse.sendErrorMessage(403, req.headers.language, err, res);
                } else {
                  return sendResponse.sendSuccessData(result, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
                }
              })
        //     }
        //   })
        } catch (err) {
          console.log("555555555555555555555555",err)
          return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
        }
    },
    // add_update_push_notf:async(req, res) => {
    //     try {

    //         if(req.body.id){
    //             await Models.PushNotf.updateOne({"_id":req.body.id},{"message":req.body.message},function(err,result){
    //                 if (err) {
    //                     return sendResponse.sendErrorMessageData(400,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.ERROR.DEFAULT,errDelete,res);
    //                 } else {
    //                     return sendResponse.sendSuccessData({},200,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,res);
    //                 }
    //             })
                
    //         }
    //         else{
    //             Models.PushNotf.create({
        
    //                 message:req.body.message
                    
    //             },function(err,result){
    //                 if (err) {
    //                     return sendResponse.sendErrorMessageData(400,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.ERROR.DEFAULT,errDelete,res);
    //                 } else {
    //                     return sendResponse.sendSuccessData({},200,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,res);
    //                 }
    //             })
    //         }
          
    //     } catch (err) {
    //         console.log(err)
    //         return sendResponse.sendErrorMessage(500,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR,res);
    //     }
    // },

    list_push_notf: (req, res) => {
        try {
            Models.PushNotf.find(function (err, result) {
                console.log(err," ----------------------- ",result)
                if (err) {
                    return sendResponse.sendErrorMessageData(400,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.ERROR.DEFAULT,errDelete,res);
                } else {
                    return sendResponse.sendSuccessData(result,200,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,res);
                }
            });            
  
        } catch (err) {
            console.log("err ------------ ",err)
            return sendResponse.sendErrorMessage(500,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR,res);
        }
    },
    delete_push_notf: async (req, res) => {
        try {
    
          Models.PushNotf.deleteOne({ "_id": ObjectId(req.query.id) },function(err, result) {
            console.log(err,"1111111111",result)
            if (err) {
              return sendResponse.sendErrorMessage(403, req.headers.language, err, res);
            }
            else {
              return sendResponse.sendSuccessData(result, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
            }
          })
    
        } catch (err) {
          console.log(err)
          return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
    
        }
      }
};
