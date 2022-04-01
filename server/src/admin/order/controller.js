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
  update_order: async (req, res) => {
    try {
      console.log(req.body, '==============herr')
      var payload = req.body;
      var dataToUpdate = { "status": payload.status };
      var criteria = { "_id": ObjectId(payload.id) }

      Models.Order.updateOne(criteria, dataToUpdate, function (err, result) {
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
  },

  list_order: (req, res) => {
    try {
      // Models.Order.find({}, function (err, result) {

      Models.Order.find()
        .populate('userId', '_id name email image')
        .populate('productId', '_id name amount description image')
        .exec(function (err, result) {
          if (err) {
            return sendResponse.sendErrorMessageData(400, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.DEFAULT, errDelete, res);
          } else {
            console.log("result =============== ", JSON.stringify(result))
            return sendResponse.sendSuccessData(result, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
          }
        });

    } catch (err) {
      console.log("err ------------ ", err)
      return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
    }
  },
  delete_order: async (req, res) => {
    try {
      console.log(req.body, '==============herr')
      Models.Order.deleteOne({ "_id": ObjectId(req.query.id) }, function (err, result) {
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
  },


  // add_update_mood: async (req, res) => {
  //   try {

  //     var payload = req.body;
  //     console.log("payload ---------- ",payload)
  //     const options = { "upsert": true };
  //     const criteriaToMatch = { "name": payload.name };
  //     // const dataToUpdate = { "name": payload.name };
  //     var criteria = { "name": payload.name };

  //     if (payload._id && payload._id != "") {
  //       criteriaToMatch._id = { $ne: payload._id }
  //       criteria = { "_id": payload._id };
  //     }
  //     console.log(criteriaToMatch,"00000000000000000",criteria)
  //     Models.Moods.findOne(criteriaToMatch, function (err, result) {
  //       if (err) {
  //         return sendResponse.sendErrorMessage(500, req.headers.language, err, res);
  //       } else if (result && result != "") {
  //         return sendResponse.sendErrorMessage(403, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.MOOD_ALREADY_EXISTS, res);
  //       } else {
  //         delete payload._id
  //         Models.Moods.updateOne(criteria, payload, options, function (err, result) {
  //           if (err) {
  //             return sendResponse.sendErrorMessage(403, req.headers.language, err, res);
  //           } else {
  //             return sendResponse.sendSuccessData(result, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
  //           }
  //         })
  //       }
  //     })
  //   } catch (err) {
  //     console.log("555555555555555555555555",err)
  //     return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
  //   }
  // },

  // list_moods: (req, res) => {
  //   try {
  //     Models.Moods.find({}, function (err, result) {
  //       if (err) {
  //         return sendResponse.sendErrorMessageData(400, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.DEFAULT, errDelete, res);
  //       } else {
  //         // console.log("result =============== ",result)
  //         return sendResponse.sendSuccessData(result, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
  //       }
  //     });

  //   } catch (err) {
  //     console.log("err ------------ ", err)
  //     return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
  //   }
  // },

  // delete_moods: async (req, res) => {
  //   try {

  //     Models.Moods.deleteOne({ "_id": ObjectId(req.query.id) }, function (err, result) {
  //       if (err) {
  //         return sendResponse.sendErrorMessage(403, req.headers.language, err, res);
  //       }
  //       else {
  //         return sendResponse.sendSuccessData(result, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
  //       }
  //     })


  //   } catch (err) {
  //     console.log(err)
  //     return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);

  //   }
  // }
};
