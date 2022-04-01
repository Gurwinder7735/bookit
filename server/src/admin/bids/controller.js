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


    list_bids: async (req, res) => {

        try {

            console.log("PARAMS", req.query);

            let condition = {}

            if(req.query.userId && req.query.userId !== 'undefined'){
              condition.user =  req.query.userId
            }else{
              req.query.userId = ''
            }
          
          

            if (req.query.search) {

               condition.title =  { $regex: ".*" + req.query.search + ".*" }

              var posts = await Models.PostBids.paginate(  
               condition,
                {
                  offset:
                    req.query.page == 1
                      ? 0
                      : req.query.page * req.query.perPage - req.query.perPage,
                  limit: req.query.perPage,
                }
              );
          
            } else {
              var posts = await Models.PostBids.paginate(
                condition,  
                {
                  offset:
                    req.query.page == 1
                      ? 0
                      : req.query.page * req.query.perPage - req.query.perPage,
                  limit: req.query.perPage,
                  sort: {
                    createdAt: -1
                  },
                  populate : ['user','post'],    
                }
              )
            }
  
          
            console.log('PAGINATION COUNTER', posts.pagingCounter)
          
            posts.docs = posts.docs.map(post =>{
              post = post.toJSON()
              post.sr_no = posts.pagingCounter++
               return post
            })
          
            // return res.json({users})
            console.log(posts)

            return sendResponse.sendSuccessData(posts, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);


        } catch (err) {
            console.log("err ------------ ", err)
            return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
        }
    },



    get_bid: async (req, res) => {

      try {

       let post = await Models.PostBids.findById(req.params.id).populate('user','firstName')
         

          return sendResponse.sendSuccessData(post, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);


      } catch (err) {
          console.log("err ------------ ", err)
          return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
      }
  },

  

    delete_bids: async (req, res) => {
        try {
  
            let success = await Models.PostBids.findByIdAndRemove(req.params.id); 
   
            if(success){
                return sendResponse.sendSuccessData(result, 200, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT, res);
            }
        
        } catch (err) {
            return sendResponse.sendErrorMessage(500, req.headers.language, RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR, res);
        }

    },


};
