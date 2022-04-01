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


    
router.get('/users', [requireAuthentication],controller.listing);
router.get('/users/:id', controller.getById);
router.put('/users/:id', controller.update);
router.delete('/users/:id',[ validator(routeValidators.delete)], controller.delete);



module.exports = router;
