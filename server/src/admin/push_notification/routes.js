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
const controller = require('./controller'),
    routeValidators = require('./validator');


router.post('/add_update_pushnotification', [requireAuthentication, validator(routeValidators.add_update_pushnotification)], controller.add_update_push_notf);
router.get('/list_pushnotification', requireAuthentication, controller.list_push_notf);
router.delete('/delete_push',[requireAuthentication, validator(routeValidators.delete_push)], controller.delete_push_notf);

module.exports = router;
