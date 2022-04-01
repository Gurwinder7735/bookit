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


router.post('/add_update_page',  [requireAuthentication, validator(routeValidators.add_update_page)], controller.add_update_page);
router.get('/list_pages',requireAuthentication,controller.listing_pages)


module.exports = router;
