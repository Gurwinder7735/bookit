"use strict";
let {Rooms} = require('../../../models')
let {sendSuccess, sendError} = require('../../../utils').universalFunctions

module.exports = {

  getRooms: async (req, res) => {
    try {
   
      // let success = await Rooms.create(req.body);

      if(1){
        return sendSuccess(...[res,,{}])
      }


    } catch (err) {

     
    }
  },
  createRoom: async (req, res) => {
    try {
   
      let success = await Rooms.create(req.body);

      if(success){
        return sendSuccess(...[res,,{}])
      }else{
        throw new Error()
      }


    } catch (error) {

     return sendError(res,error.message)

     
    }
  },


};
