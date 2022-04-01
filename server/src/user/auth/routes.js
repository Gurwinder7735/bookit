'use strict';

// const multipart = require('connect-multiparty');
// const multipartMiddleware =   multipart();


// npm modules
const express = require('express')
 const validator = require('express-joi-validator');
const { checkLoggedUser } = require('../../middlewares/auth');
// const { authenticateUser } = require('../../../passport');

// router
const router = express.Router();

const controller = require('./controller')
const routeValidators = require('./validator');

router.post('/login',controller.login );
router.post('/register',[ validator(routeValidators.register)],controller.register );
router.get('/protectedRoute',[ checkLoggedUser],controller.protectedRoute );

// router.put("/resendOtp",[ controller.resendOtp);


module.exports = router;
