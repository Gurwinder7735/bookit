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
const Order = require('./controller'),
    routeValidators = require('./validator');


router.post("/update_order", [requireAuthentication, validator(routeValidators.update_order)], Order.update_order)
router.get('/list_order', requireAuthentication, Order.list_order);
router.delete('/delete_order', [requireAuthentication, validator(routeValidators.order_delete)], Order.delete_order);
// router.get('/list_moods', requireAuthentication, controller.list_moods);
// router.delete('/delete_moods', [requireAuthentication, validator(routeValidators.moods_delete)], controller.delete_moods);

module.exports = router;
