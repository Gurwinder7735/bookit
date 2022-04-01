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
const feedback = require('./controller'),
    routeValidators = require('./validator');



router.get('/list_feedback', requireAuthentication, feedback.list_feedback);
router.delete('/delete_feedback', [requireAuthentication, validator(routeValidators.promo_feedback)], feedback.delete_feedback);
// router.get('/list_moods', requireAuthentication, controller.list_moods);
// router.delete('/delete_moods', [requireAuthentication, validator(routeValidators.moods_delete)], controller.delete_moods);

module.exports = router;
