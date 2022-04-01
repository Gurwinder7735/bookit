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


router.post('/login', validator(routeValidators.login), controller.login);
router.post('/edit_profile', [requireAuthentication, validator(routeValidators.edit_profile)], controller.edit_profile);
router.post('/change_password', [requireAuthentication, validator(routeValidators.change_password)], controller.change_password);
router.get('/dashboard', controller.admin_counters);

module.exports = router;
