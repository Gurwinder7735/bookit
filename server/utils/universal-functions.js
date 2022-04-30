'use strict';

// npm modules
const joi = require('joi');


const sendSuccess = function (res,message = 'Success!',data={}) {
    try{

        return res.status(200).json({
            success: true,
            stausCode: 200,
            message,
            data
        })
   

    }catch(err){
        console.error(err);
    }
};

const sendError = function (res,message,data={}) {
    try{

        return res.status(500).json({
            success: false,
            stausCode: 500,
            message,
            data
        })
   

    }catch(err){
        console.error(err);
    }
};

const sendForgotPasswordMail = async (token, email) => {

    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass:process.env.SMTP_PASS, // generated ethereal password
      },
    });
  
    let info = await transporter.sendMail({
      from: `"Fair Share" <${process.env.SMTP_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: "Reset Your Password!", // Subject line
      text: "", // plain text body
      html : `
      <!-- START HEAD -->
  <head>
      
      <!-- CHARSET -->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      
      <!-- MOBILE FIRST -->
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      
      <!-- GOOGLE FONTS -->
      <link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
      
      <!-- RESPONSIVE CSS -->
      <style type="text/css">
          @media only screen and (max-width: 550px){
              .responsive_at_550{
                  width: 90% !important;
                  max-width: 90% !important;
              }
          }
      </style>
  
  </head>
  <!-- END HEAD -->
  
  <!-- START BODY -->
  <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
      
      <!-- START EMAIL CONTENT -->
      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">        
          <tbody>
              
              <tr>
                  
                  <td align="center" bgcolor="#1976D2">
                      
                      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                          <tbody>
                              <tr>
                                  <td width="100%" align="center">
                                      
                                      <!-- START SPACING -->
                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                          <tbody>
                                              <tr>
                                                  <td height="40">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- END SPACING -->
                                      
             
                                      
                                      <!-- START SPACING -->
                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                          <tbody>
                                              <tr>
                                                  <td height="40">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- END SPACING -->
                                      
                                      <!-- START CONTENT -->
                                      <table width="500" border="0" cellpadding="0" cellspacing="0" align="center" style="padding-left:20px; padding-right:20px;" class="responsive_at_550">
                                          <tbody>
                                              <tr>
                                                  <td align="center" bgcolor="#ffffff">
                                                      
                                                      <!-- START BORDER COLOR -->
                                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                          <tbody>
                                                              <tr>
                                                                  <td width="100%" height="7" align="center" border="0" bgcolor="#03a9f4"></td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- END BORDER COLOR -->
                                                      
                                                      <!-- START SPACING -->
                                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                          <tbody>
                                                              <tr>
                                                                  <td height="30">&nbsp;</td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- END SPACING -->
                                                      
                                                      <!-- START HEADING -->
                                                      <table width="90%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                          <tbody>
                                                              <tr>
                                                                  <td width="100%" align="center">
                                                                      <h1 style="font-family:'Ubuntu Mono', monospace; font-size:20px; color:#202020; font-weight:bold; padding-left:20px; padding-right:20px;">Reset your password</h1>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- END HEADING -->
                                                      
                                                      <!-- START PARAGRAPH -->
                                                      <table width="90%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                          <tbody>
                                                              <tr>
                                                                  <td width="100%" align="center">
                                                                      <p style="font-family:'Ubuntu', sans-serif; font-size:14px; color:#202020; padding-left:20px; padding-right:20px; text-align:justify;">You received this E-mail in response to your request to reset your password.</p>
                                                                      <p style="font-family:'Ubuntu', sans-serif; font-size:14px; color:#202020; padding-left:20px; padding-right:20px; text-align:justify;">Click the button below to reset your password, the reset password link is only valid for 1 hour.</p>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- END PARAGRAPH -->
                                                      
                                                      <!-- START SPACING -->
                                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                          <tbody>
                                                              <tr>
                                                                  <td height="30">&nbsp;</td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- END SPACING -->
                                                      
                                                      <!-- START BUTTON -->
                                                      <table width="200" border="0" cellpadding="0" cellspacing="0" align="center">
                                                          <tbody>
                                                              <tr>
                                                                  <td align="center" bgcolor="#1976D2">
                                                                      <a style="font-family:'Ubuntu Mono', monospace; display:block; color:#ffffff; font-size:14px; font-weight:bold; text-decoration:none; padding-left:20px; padding-right:20px; padding-top:20px; padding-bottom:20px;" href="${global.baseUrl}/api/auth/resetPassword/${token}">Reset Password</a>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- END BUTTON -->
                                                      
                                                      <!-- START SPACING -->
                                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                          <tbody>
                                                              <tr>
                                                                  <td height="30">&nbsp;</td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- END SPACING -->
                                                      
                                                      <!-- START PARAGRAPH -->
                                                      <table width="90%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                          <tbody>
                                                              <tr>
                                                                  <td width="100%" align="center">
                                                                      <p style="font-family:'Ubuntu', sans-serif; font-size:14px; color:#202020; padding-left:20px; padding-right:20px; text-align:justify;">If the above button doesn't work, you can reset your password by clicking the following link, <a href="${global.baseUrl}/api/auth/resetPassword/${token}">Reset password</a>.</p>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- END PARAGRAPH -->
                                                      
                                                      <!-- START SPACING -->
                                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                          <tbody>
                                                              <tr>
                                                                  <td height="30">&nbsp;</td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <!-- END SPACING -->
                                                      
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- END CONTENT -->
                                      
                                      <!-- START SPACING -->
                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                          <tbody>
                                              <tr>
                                                  <td height="40">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- END SPACING -->
                                      
                                   
                              
                                      
                                      <!-- START SPACING -->
                                      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                          <tbody>
                                              <tr>
                                                  <td height="40">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <!-- END SPACING -->
                                      
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      
                  </td>
                  
              </tr>
              
          </tbody>        
      </table>
      <!-- END EMAIL CONTENT -->
      
  </body>
  <!-- END BODY -->,
      `
    });
  
    if (info.messageId) {
      return true;
    } else {
      return false;
    }
  
    console.log(info.messageId);
};
  

const failActionFunction = function (request, reply, error) {
    try{
        console.log("mmmmmmmmmm", request.payload);
        console.log("mmmmmmmmmm--------_>>>>>>>>>>.", request.query);
        console.log("mmmmmmmmmm=======",  error.output.payload.type);

        error.output.payload.type = "Joi Error";

        if (error.isBoom) {
            delete error.output.payload.validation;
            if (error.output.payload.message.indexOf("authorization") !== -1) {
                error.output.statusCode = RESPONSE_MESSAGES.STATUS_MSG.ERROR.UNAUTHORIZED.statusCode;
                return error;
            }
            let details = error.details[0];
            if (details.message.indexOf("pattern") > -1 && details.message.indexOf("required") > -1 && details.message.indexOf("fails") > -1) {
                error.output.payload.message = "Invalid " + details.path;
                
                return error;
            }
        }

        let customErrorMessage = '';
        if (error.output.payload.message.indexOf("[") > -1) {
            customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf("["));
        } else {
         
            customErrorMessage = error.output.payload.message;
        }
        customErrorMessage = customErrorMessage.replace(/"/g, '');
        customErrorMessage = customErrorMessage.replace('[', '');
        customErrorMessage = customErrorMessage.replace(']', '');
        customErrorMessage = customErrorMessage.replace(customErrorMessage.charAt(0), customErrorMessage.charAt(0).toUpperCase());
        error.output.payload.message = customErrorMessage;
 
        delete error.output.payload.validation;
        return error;

    }catch(err){
        console.error(err);
    }
};


const authorizationHeaderObj = joi.object({
    authorization: joi.string().required()
}).unknown();

const authorizationHeaderObjOptional = joi.object({
    authorization: joi.string().optional()
}).unknown();



module.exports = {
 
    failActionFunction: failActionFunction,
  
    authorizationHeaderObj: authorizationHeaderObj,
    authorizationHeaderObjOptional:authorizationHeaderObjOptional,
    sendSuccess,
    sendError
  
};
