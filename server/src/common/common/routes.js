'use strict';

// npm modules
const express = require('express'),
    validator = require('express-joi-validator');

// router
const router = express.Router();

const multipart       =     require('connect-multiparty');
const multipartMiddleware = multipart();

// local modules
const controller = require('./controller'),
    routeValidators = require('./validator');


router.post('/file_upload',[multipartMiddleware], controller.file_upload);
router.post('/test_file_upload',validator(routeValidators.file_upload), controller.file_upload);

module.exports = router;
