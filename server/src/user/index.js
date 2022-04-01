/**
 * Makes all features available to outer modules.
 */

const express = require('express')
const router =   express.Router();

router.use('/auth', require('./auth').Routes)
router.use('/', require('./rooms').Routes)


module.exports = {
   routes : [ router ],
   swagger: [{
       ...require('./auth').swagger.paths
   }],
   swaggerSchemas: [{
       ...require('./auth').swagger.schemas
   }]
};
