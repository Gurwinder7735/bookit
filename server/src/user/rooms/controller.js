"use strict";
let {Rooms} = require('../../../models');
const { findByIdAndUpdate } = require('../../../models/Rooms');
const APIFeatures = require('./controllerUtil');
let {sendSuccess, sendError} = require('../../../utils').universalFunctions

module.exports = {

  getRooms: async (req, res) => {
    try {

      const resPerPage = 10;
      const roomsCount = await Rooms.countDocuments();

      const apiFeatures = new APIFeatures(Rooms.find(), req.query).search().filter()
   
     let rooms = await apiFeatures.query;
     let filteredRoomsCount = rooms.length

     apiFeatures.pagination(resPerPage)
     rooms = await apiFeatures.query.clone();

     if(rooms){
       return sendSuccess(res,'Get rooms success!',
       {
        
        roomsCount,
         resPerPage,
         filteredRoomsCount ,
         rooms,
       }
       )
     }


    } catch (err) {

      sendError(res,err.message)
     
    }
  },

  getSingleRoom: async (req, res) => {
    try {

      
     let room = await Rooms.findById(req.params.id);

     if(!room){
     return sendError(res,'Room not found!')
    }
    
    return sendSuccess(res,'Get rooms success!',{room})

    } catch (err) {
       return sendError(res,err.message)
     
    }
  },

  updateRoom: async (req, res) => {
    try {

      
     let room = await Rooms.findById(req.params.id);

     if(!room){
     return sendError(res,'Room not found!')
     }

     room = await Rooms.findByIdAndUpdate(req.params.id,req.body,{
       new:true,
       runValidators:true
     })


    
    return sendSuccess(res,'Room updated successfully!!',{room})

    } catch (err) {
       return sendError(res,err.message)
     
    }
  },

  deleteRoom: async (req, res) => {
    try {

      
     let room = await Rooms.findById(req.params.id);

     if(!room){
     return sendError(res,'Room not found!')
     }

     room.remove()

     room = await Rooms.findByIdAndUpdate(req.params.id,req.body,{
       new:true,
       runValidators:true
     })


    
    return sendSuccess(res,'Room updated successfully!!',{room})

    } catch (err) {
       return sendError(res,err.message)
     
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
