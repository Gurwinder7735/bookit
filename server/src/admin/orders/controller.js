"use strict";

const UniversalFunction = require("../../../utils/universal-functions");
const Constants = require("../../../config/appConstants");

const Models = require("../../../models"),
  sendResponse = require("../../sendResponse"),
  RESPONSE_MESSAGES = require("../../../config/response-messages");

const currentModule = "Orders";

module.exports = {

  listing: async (req, res) => {
    
    try {
      console.log("BODY", req.query);

      let condition = {};

      if (req.query.keyword !== 'undefined' && !req.query.keyword) {
        condition = {
          ...condition,
          title: { $regex: ".*" + req.query.keyword + ".*" },
        };
      }

      // let condition2 = {}

      console.log('req.query.userId',req.query.userId);

      if (req.query.hasOwnProperty('userId') && req.query.userId != 'undefined' && req.query.userId != '') {
        condition = {
          ...condition,
          user: req.query.userId,
        };
      }

      console.log("condition>>>>>>>>>>>>>>>>", condition);

      var users = await Models[currentModule].paginate(condition, {
        offset:
          req.query.page == 0
            ? 1
            : req.query.page * req.query.perPage - req.query.perPage,
        limit: req.query.perPage,
        sort: {
          createdAt: -1,
        },
        populate: [
          {
            path: "user",
            select: "_id name",
            model: "Users",
            // match : condition2,
            // required: true
          },
          {
            path: "orderedProduct.product",
            select: "_id title rent",
            model: "Products",
            // match : condition2,
            // required: true
          }
        ],
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

  getById: async (req, res) => {

    try {
      
      let result = await Models[currentModule].findById(req.params.id).populate([
        {
          path: "user",
          select: "_id name",
          model: "Users",
          // match : condition2,
          // required: true
        },
        {
          path: "orderedProduct.product",
          select: "_id title",
          model: "Products",
          // match : condition2,
          // required: true
        }
      ]);

      return sendResponse.sendSuccessData(
        result,
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
      let result = await Models[currentModule].deleteOne({
        _id: req.params.id,
      });

      console.log("result", result);
      if (result) {
        return sendResponse.sendSuccessData(
          result,
          200,
          req.headers.language,
          RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT,
          res
        );
      }
    } catch (err) {
      console.log("err0", err);
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

        console.log(req.body);

          let user = await Models[currentModule].findByIdAndUpdate(req.params.id, req.body, {new : true});

   console.log(user);

          return sendResponse.sendSuccessData(user, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);

      } catch (err) {
          console.log("err ------------ ", err)
          return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
      }
  },

  //    delete_user: async (req, res) => {

  //         try {

  //             let success = await Models.Users.findByIdAndRemove(req.params.id);

  //             if (success) {
  //                 return sendResponse.sendSuccessData(user, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
  //             } else {
  //                 return sendResponse.sendErrorMessage(400, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
  //             }

  //         } catch (err) {
  //             console.log("err ------------ ", err)
  //             return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
  //         }
  //     },
};
