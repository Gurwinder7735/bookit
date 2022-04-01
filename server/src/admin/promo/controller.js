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


module.exports = {

  add_update_promo: async (req, res) => {
    try {
      console.log('===================================hehehehe')
      var payload = req.body;
      console.log("payload ---------- ", payload)
      const options = { "upsert": true };
      const criteriaToMatch = { "code": payload.code };
      // const dataToUpdate = { "name": payload.name };
      var criteria = { "code": payload.code };
      console.log(criteriaToMatch, '=================criteriaToMatch')
      if (payload._id && payload._id != "") {
        criteriaToMatch._id = { $ne: payload._id }
        criteria = { "_id": payload._id };
      }
      Models.Promo.findOne(criteriaToMatch, function (err, result) {
        if (err) {
          return sendResponse.sendErrorMessage(500, req.headers.language, err, res);
        } else if (result && result != "") {
          return sendResponse.sendErrorMessage(403, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.PROMO_ALREADY_EXISTS, res);
        } else {
          delete payload._id

          // console.log(" payload ---------- ",typeof payload.productId," --------------- ",payload.productId)
          // for(let key in payload.productId) {
          //   payload.productId[key] = ObjectId(payload.productId[key]);
          // }
          // for(let key in payload.categoryId) {
          //   payload.categoryId[key] = ObjectId(payload.categoryId[key]);
          // }
          // payload.productId = (payload.productId).map(p => ObjectId(p));
          // payload.categoryId = (payload.categoryId).map(c => ObjectId(c));
          // console.log(" payload ---------- ",payload)
          Models.Promo.updateOne(criteria, payload, options, function (err, result) {
            if (err) {
              console.log("444444444444444444444444444",err)
              return sendResponse.sendErrorMessage(403, req.headers.language, err, res);
            } else {
              return sendResponse.sendSuccessData(result, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
            }
          })
        }
      })
    } catch (err) {
      console.log("555555555555555555555555", err)
      return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
    }
  },


  list_promo: (req, res) => {
    try {
      Models.Promo.find({}, function (err, result) {
        if (err) {
          return sendResponse.sendErrorMessageData(400, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.DEFAULT, errDelete, res);
        } else {
          // console.log("result =============== ",result)
          return sendResponse.sendSuccessData(result, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
        }
      });

    } catch (err) {
      console.log("err ------------ ", err)
      return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
    }
  },
  delete_promo: async (req, res) => {
    try {
      console.log(req.body, '==============herr')
      Models.Promo.deleteOne({ "_id": ObjectId(req.query.id) }, function (err, result) {
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
