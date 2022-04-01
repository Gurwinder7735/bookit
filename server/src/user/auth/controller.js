"use strict";
var jwt = require('jsonwebtoken');
const {Users} = require("../../../models");
const { sendSuccess, sendError } = require("../../../utils/universal-functions");




module.exports = {
  login: async (req, res) => {
    try {

      let user = await Users.findOne({email: req.body.email});
      if(!user){

        console.log(user,"user")
        return sendError(res,"User not found!")
       
      }

      user = user.toJSON();

      if(user && user.password == req.body.password){
        var token = jwt.sign({ id: user._id }, 'woo', { expiresIn: '1h'});
        user.token = token;

        const cookieOptions = {
          expires: new Date(
            Date.now() + 1 * 60 * 60 * 1000
          ),
          httpOnly: false,
          // Send a cookie to be secure if its on a production environment.
          // Check if the connection is secure, OR if the header contains HTTPS.
          // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        };
      
        // Send a cookie (back-end, must be assigned again in Next.js's proxy).
        res.cookie('jwt', token, cookieOptions);

         return sendSuccess(res,"User Registered Successfully!",user)
      }else{
        return sendError(res,"Invalid email or password!")
      }

    } catch (err) {
      throw err
    }
  },
  register : async (req, res) => {
    try {

      let user = await Users.create(req.body);
      if(user){

        console.log(user,"user")
        return sendSuccess(res,"User Registered Successfully!")
      }
       return sendError(res,"Failed to create user!")

    } catch (err) {
        throw err
    }
  },
  protectedRoute : async (req, res) => {
    try {


        console.log("HIIIIIIII",req.user)

    } catch (err) {
        throw err
    }
  },


};
