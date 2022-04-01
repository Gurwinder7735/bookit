/**
 * Makes all features available to outer modules.
 */

const express = require('express')
const router = express.Router();

router.use('/', require('./admin').Routes);
router.use('/', require('./users').Routes);
router.use('/', require('./posts').Routes);
router.use('/', require('./category').Routes);
router.use('/', require('./subCategory').Routes);
router.use('/', require('./brands').Routes);
router.use('/', require('./product').Routes);
router.use('/', require('./banners').Routes);
router.use('/', require('./orders').Routes);
// router.use('/', require('./promo').Routes);
// router.use('/', require('./feedback').Routes);
// router.use('/', require('./order').Routes);
// router.use('/', require('./productType').Routes);
// router.use('/', require('./promo_banner').Routes);
router.use('/', require('./cms').Routes);

// router.use('/', require('./push_notification').Routes);
router.use('/', require('./pages').Routes);
module.exports = {
    routes: [router],
    swagger: [{
        ...require('./admin').swagger.paths,
        // ...require('./moods').swagger.paths,
        // ...require('./events').swagger.paths,
        ...require('./users').swagger.paths,
        ...require('./category').swagger.paths,
        ...require('./product').swagger.paths,
        ...require('./promo').swagger.paths,
        ...require('./feedback').swagger.paths,
        ...require('./order').swagger.paths,
        ...require('./productType').swagger.paths,
        ...require('./promo_banner').swagger.paths,
        ...require('./pages').swagger.paths
    }],
    swaggerSchemas: [{
        ...require('./admin').swagger.schemas,
        ...require('./users').swagger.schemas,
        ...require('./category').swagger.schemas,
        ...require('./product').swagger.schemas,
        ...require('./promo').swagger.schemas,
        ...require('./order').swagger.schemas,
        ...require('./productType').swagger.schemas,
        ...require('./promo_banner').swagger.schemas,
        ...require('./pages').swagger.schemas
    }]
};
