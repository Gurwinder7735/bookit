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

validators = require('./validator');



router.post("/banners", [ validator(validators.add)], controller.add)
router.put("/banners/:id", [ validator(validators.update)], controller.update)
router.get('/banners',  controller.listing);
router.get('/banners/:id',  controller.getByid);
router.delete('/banners/:id', [ validator(validators.delete)], controller.delete);

// router.delete('/delete_moods', [requireAuthentication, validator(routeValidators.moods_delete)], controller.delete_moods);

module.exports = router;
