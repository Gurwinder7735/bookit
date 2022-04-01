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
const promo = require('./controller'),
    routeValidators = require('./validator');



router.post("/add_update_promo", [requireAuthentication, validator(routeValidators.add_update_promo)], promo.add_update_promo)
router.get('/list_promo', requireAuthentication, promo.list_promo);
router.delete('/delete_promo', [requireAuthentication, validator(routeValidators.promo_delete)], promo.delete_promo);
// router.get('/list_moods', requireAuthentication, controller.list_moods);
// router.delete('/delete_moods', [requireAuthentication, validator(routeValidators.moods_delete)], controller.delete_moods);

module.exports = router;
