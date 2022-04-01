"use strict";

const Models = require("../../../models"),
  sendResponse = require("../../sendResponse"),
  RESPONSE_MESSAGES = require("../../../config/response-messages");

const currentModule = "SubCategory";

module.exports = {

  add: async (req, res) => {
    try {
      let alreadyExists = await Models[currentModule].findOne({
        name: req.body.name,
      });

      if (alreadyExists) {
        return sendResponse.sendErrorMessage(
          403,
          req.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.ERROR.MOOD_ALREADY_EXISTS,
          res
        );
      }

      let category = await Models[currentModule].create(req.body);

      if (category) {
        return sendResponse.sendSuccessData(
          category,
          200,
          req.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          res
        );
      }
    } catch (err) {
      console.log("ERROR", err);
      return sendResponse.sendErrorMessage(
        500,
        req.headers.language,
        RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR,
        res
      );
    }
  },

  update: async (req, res) => {
    try {

      let update = await Models[currentModule].findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (update) {
        return sendResponse.sendSuccessData(
          update,
          200,
          req.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          res
        );
      }
    } catch (err) {
      console.log("ERROR", err);
      return sendResponse.sendErrorMessage(
        500,
        req.headers.language,
        RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR,
        res
      );
    }
  },

  getByid: async (req, res) => {
    
    try {

      let result = await Models[currentModule].findById(req.params.id).populate('category');
      console.log("result =============== ", result);

      return sendResponse.sendSuccessData(
        result,
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

  listing: async (req, res) => {

    try {

      console.log("BODY", req.query);

      if (req.query.perPage && req.query.page) {
        let condition = {};

        if (req.query.keyword !== 'undefined') {
          condition = {
            ...condition,
            name: { $regex: ".*" + req.query.keyword + ".*" },
          };
        }

        console.log('condition', condition);

        var users = await Models[currentModule].paginate(condition, {
          offset:
            req.query.page == 0
              ? 1
              : req.query.page * req.query.perPage - req.query.perPage,
          limit: req.query.perPage,
          sort: {
            createdAt: -1,
          },
          populate: ['category']
        });


        console.log("PAGINATION COUNTER", users.pagingCounter);

        users.docs = users.docs.map((user) => {
          user = user.toJSON();
          user.sr_no = users.pagingCounter++;
          return user;
        });
      }else{

        let condition = {}
        req.query.catId ? condition.category = req.query.catId: ""
        console.log('condition',condition);
        var users = await Models[currentModule].find(condition).populate('category')
      }

      return sendResponse.sendSuccessData(
        users,
        200,
        req.headers.language,
        RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
        res
      );
    } catch (err) {
      console.log("err ------------ ", err);
      return sendResponse.sendErrorMessage(
        500,
        req.headers.language,
        RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR,
        res
      );
    }
  },


  delete: async (req, res) => {
    try {
      let success = await Models[currentModule].deleteOne({
        _id: req.params.id,
      });

      if (success) {
        return sendResponse.sendSuccessData(
          success,
          200,
          req.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          res
        );
      } else {
        return sendResponse.sendErrorMessage(
          403,
          req.headers.language,
          err,
          res
        );
      }
    } catch (err) {
      console.log(err);
      return sendResponse.sendErrorMessage(
        500,
        req.headers.language,
        RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR,
        res
      );
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
