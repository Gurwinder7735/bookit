"use strict";

const Models = require("../../../models"),
  sendResponse = require("../../sendResponse"),
  RESPONSE_MESSAGES = require("../../../config/response-messages");

const currentModule = "Banners";

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

      console.log('BODY', req.body,req.params.id) 
      // return  

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

      let result = await Models[currentModule].findById(req.params.id);
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

      let condition = {role: 1};

      if (req.query.keyword !== 'undefined') {
        condition = {
          ...condition,
          name: { $regex: ".*" + req.query.keyword + ".*" },
        };
      }

      console.log('condition',condition);
      
      var users = await Models[currentModule].paginate(condition, {
        offset:
          req.query.page == 0
            ? 1
            : req.query.page * req.query.perPage - req.query.perPage,
        limit: req.query.perPage,
        sort: {
          createdAt: -1,
        },
      });


      console.log("PAGINATION COUNTER", users.pagingCounter);

      users.docs = users.docs.map((user) => {
        user = user.toJSON();
        user.sr_no = users.pagingCounter++;
        return user;
      });

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
}