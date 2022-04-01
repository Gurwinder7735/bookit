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
const productType = require('./controller'),
    routeValidators = require('./validator');



router.post("/add_update_productType", requireAuthentication, productType.add_update_productType)
router.get('/list_productType', requireAuthentication, productType.list_productType);
router.delete('/delete_productType', [requireAuthentication, validator(routeValidators.productType_delete)], productType.delete_productType);
// router.post("/update_productType_status", [requireAuthentication, validator(routeValidators.update_productType_status)], productType.update_productType_status)

// router.get('/list_moods', requireAuthentication, controller.list_moods);
// router.delete('/delete_moods', [requireAuthentication, validator(routeValidators.moods_delete)], controller.delete_moods);

module.exports = router;
