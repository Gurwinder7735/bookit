const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');

const app = next({ dev });
const handle = app.getRequestHandler();
require('dotenv').config()
const { parse } = require('url');
const [apiRoutes] = require('./server/src/user').routes;
const { mongo } = require('./server/config/dbConfig.js');

mongoose.connect(mongo);

console.log('mongo',mongo)

mongoose.connection.on('error', function (err) {
    console.log(err);   
    console.log('Unable to connect to db...', err.message);
    process.exit();
});

mongoose.connection.once('open', function () {
    console.log('DB CONNECTED');
});

console.log('NODE ENV',process.env.NODE_ENV);


app.prepare().then(() => {
  
  const server = express();

  server.use(bodyParser.json());
  server.use(cookieParser());
  server.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }));

  server.use('/api', apiRoutes);

  // Server-side
  // const route = pathMatch();



  server.get('*', (req, res) => {
    return handle(req, res);
  });
 
  server.use(function (err, req, res, next) {
    console.log("errr----");
    let status = 500, json = {
        status: 0,
        message: err.message.en || err.message
    };
    if (err.isBoom) {

    err.data[0].message = err.data[0].message.replace( /"/g, "" );
    console.log('err.data[0].message',err.data[0].message)
        json = { status: 0,statusCode: 500,data:{}, message: err.data[0].message }
        status = err.output.statusCode;
    }
    return res.status(status).json(json);
});


  /* eslint-disable no-console */
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server ready on http://localhost:3000');
  });

});