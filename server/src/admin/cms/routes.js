'use strict';

// const multipart = require('connect-multiparty');
// const multipartMiddleware =   multipart();


// npm modules
const express = require('express'),
    validator = require('express-joi-validator');

// router
const router = express.Router();
const requireAuthentication = require('../../../passport').authenticateAdmin;

// local modules
const controller = require('./controller')
const routeValidators = require('./validator');




router.get('/cms/:type', controller.getCMS);
router.put('/cms/:type', controller.updateCMS )


module.exports = router;
