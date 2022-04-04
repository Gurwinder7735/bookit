'use strict';

// const multipart = require('connect-multiparty');
// const multipartMiddleware =   multipart();


// npm modules
const express = require('express')
 const validator = require('express-joi-validator');
// const { authenticateUser } = require('../../../passport');

// router
const router = express.Router();

const controller = require('./controller')
const routeValidators = require('./validator');

router.get('/rooms',[ validator(routeValidators.getRooms)],controller.getRooms );
router.get('/room/:id',[ validator(routeValidators.getRooms)],controller.getSingleRoom );
router.put('/room/:id',controller.updateRoom );
router.delete('/room/:id',controller.deleteRoom );
router.post('/rooms',[ validator(routeValidators.getRooms)],controller.createRoom );

// router.put("/resendOtp",[ controller.resendOtp);


module.exports = router;
