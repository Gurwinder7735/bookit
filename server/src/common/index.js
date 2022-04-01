/**
 * Makes all features available to outer modules.
 */

const express = require('express')
const router = express.Router();
router.use('/', require('./common').Routes);
module.exports = {
   routes : [ router ],
   swagger: [{
       ...require('./common').swagger.paths
   }],
   swaggerSchemas: [{
       ...require('./common').swagger.schemas
   }]
};
