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



router.get('/posts', requireAuthentication, controller.list_posts);
router.get('/posts/:id', requireAuthentication, controller.get_post);
router.delete('/posts',[requireAuthentication, validator(routeValidators.posts_delete)], controller.delete_posts);


module.exports = router;
