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


router.post('/add_update_event', [requireAuthentication, validator(routeValidators.add_update_event)], controller.add_update_event);
router.get('/list_events', requireAuthentication, controller.list_events);
router.delete('/delete_events', [requireAuthentication, validator(routeValidators.events_delete)], controller.delete_events);

module.exports = router;
