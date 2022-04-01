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
const category = require('./controller'),
    routeValidators = require('./validator');



router.post("/add_update_banner", [requireAuthentication, validator(routeValidators.add_update_banner)], category.add_update_banner)
router.get('/list_banner', requireAuthentication, category.list_banner);
router.delete('/delete_banner', [requireAuthentication, validator(routeValidators.delete_banner)], category.delete_banner);
// router.get('/list_moods', requireAuthentication, controller.list_moods);
// router.delete('/delete_moods', [requireAuthentication, validator(routeValidators.moods_delete)], controller.delete_moods);

module.exports = router;
