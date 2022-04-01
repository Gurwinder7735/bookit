'use strict';
// momentTimezone = require('moment-timezone');
// const is = require("is_js");
const Constants = require('../../../config/appConstants');
// const paymentStatuses = require('./paymentStatuses.js')
// const schedule = require('node-schedule');
const Models = require('../../../models'),
  controllerUtil = require('./controllerUtil'),
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

   file_upload: async (req, res) => {
    console.log("req.body",req.body)
    console.log("req.files ---------- ",req.files)
    let PAYLOAD = req.body;
    var FILE_TYPE = PAYLOAD.type; // image,video,etc
    var FOLDER = PAYLOAD.folder;// user,category,products,etc
    try{
        var image_data = [];
        if(req.files && req.files.image && Array.isArray(req.files.image)){
            for(var imgkey in req.files.image){
              var image_url = await controllerUtil.fileUpload(req.files.image[imgkey], FOLDER , FILE_TYPE);
              image_data.push(image_url)
            }
            console.log("11111111111111111111111111111",image_data)
            // return api_helper.success(res, 'Successufully', image_data);
            return res.status(200).json({
                status: 1,
                statusCode:200,
                message: 'Successufully',
                data: image_data
            });
        }else if(req.files && req.files.image && req.files.image.name!=""){
            var image_url = await controllerUtil.fileUpload(req.files.image, FOLDER , FILE_TYPE);
            image_data.push(image_url)
            console.log("2222222222222222222222222222")
            // return api_helper.success(res, 'Successufully', image_data);
            return res.status(200).json({
                status: 1,
                statusCode:200,
                message: 'Successufully',
                data: image_data
            });
        }else{
          return res.status(200).json({
              status: 0,
              statusCode:200,
              message: "Error - Image can't be empty",
              data: []
          });
        }
    }
    catch (err){
        console.log("err --------------- ",err)
        return res.status(400).json({status: 0, message: "Something went wrong"});
    }
  }
  
};
