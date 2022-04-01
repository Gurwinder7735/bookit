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

    add_update_event:async(req, res) => {
        try {

            var payload = req.body;
            const options = { "upsert": true };
            // const criteriaToMatch = {"name":payload.name};

            payload.eventTime = new Date(new Date().getTime() + 60000).getTime()
            payload.image = typeof payload.image === "string" ? JSON.parse(payload.image) : payload.image;
            // payload.location = typeof payload.location === "string" ? JSON.parse(payload.location) : payload.location;

            var criteria = {"name":payload.name};

            if(payload._id && payload._id!=""){
                // criteriaToMatch._id = {$ne:payload._id}
                criteria = {"_id":ObjectId(payload._id)};
            }
            console.log(payload)
            // Models.Events.findOne(criteriaToMatch, function(err, result){
            //     if(err){
            //         return sendResponse.sendErrorMessage(500,req.headers.language,err,res);
            //     }else if(result && result!=""){
            //         return sendResponse.sendErrorMessage(403,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.ERROR.MOOD_ALREADY_EXISTS,res);
            //     }else{
                    Models.Events.updateOne(criteria, payload, options, function(err,result){
                        if(err){
                            console.log("err --- ",err)
                            return sendResponse.sendErrorMessage(403,req.headers.language,err,res);
                        }else{
                            return sendResponse.sendSuccessData({},200,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,res);
                        }
                    })
            //     }
            // })
        } catch (err) {
            console.log(err)
            return sendResponse.sendErrorMessage(500,req.headers.language,RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR,res);
        }
    },

    list_events: (req, res) => {
        try {
            // Models.Events.find(function (err, result) {
            Models.Events.find()
            .populate('mood', '_id name image')
            .exec(function (err, result) {
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
    delete_events: async (req, res) => {
        try {
    
            Models.Events.deleteOne({ "_id": ObjectId(req.query.id) },function(err, result) {
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
