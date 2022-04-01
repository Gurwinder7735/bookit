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



router.get('/bids', requireAuthentication, controller.list_bids);
router.get('/bids/:id', requireAuthentication, controller.get_bid);
router.delete('/bids',[requireAuthentication, validator(routeValidators.bids_delete)], controller.delete_bids);


module.exports = router;
