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



router.get('/products', controller.listing);
router.get('/products/:id', controller.getById);
router.put('/products/:id', controller.update);
router.delete('/products/:id',[ validator(routeValidators.delete)], controller.delete);



module.exports = router;
