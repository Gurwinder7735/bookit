/**
 * Makes all features available to outer modules.
 */

let routes = [], swagger = [], swaggerSchemas=[];


if(process.env.ADMIN_ROUTES === 'True') {
    routes = [...routes, ...require('./admin/').routes]
    swagger = [...swagger, ...require('./admin').swagger]
    swaggerSchemas = [...swaggerSchemas, ...require('./admin').swaggerSchemas]
}

if(process.env.COMMON_ROUTES === 'True') {
    routes = [...routes, ...require('./common').routes]
    swagger = [...swagger, ...require('./common').swagger]
    swaggerSchemas = [...swaggerSchemas, ...require('./common').swaggerSchemas]
}


// if(process.env.USER_ROUTES === 'True'){
    routes = [...routes, ...require('./user').routes];
    swagger = [...swagger, ...require('./user').swagger]
    swaggerSchemas = [...swaggerSchemas, ...require('./user').swaggerSchemas]
// }

module.exports = {
    routes: routes,
    swagger: swagger,
    swaggerSchemas: swaggerSchemas
};
