const jwt = require('jsonwebtoken');
const Users = require('../../models/Users');
const { sendError } = require('../../utils/universal-functions');


const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, 'woo', (err, decoded) => {
      if (err) {
        return reject(err);
      }

      resolve(decoded);
    });
});


exports.checkLoggedUser = async (req, res, next) => {
    let token;
    console.log('req.cookies',req.cookies);
  
    // 1) Fetch the token, then check if it is valid or not.
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      return sendError(res, 'Token not found!')
    }
  
    // 2) Verify the token.
    const verifiedToken = await verifyToken(token);
  
    // 3) Check if user still exists in the database.
    const loggedUser = await Users.findById(verifiedToken.id);
  
    if (!loggedUser) {
     sendResponse(res,'User belonging to this token does not exist!')
    }
  
    // 4) Grant user access to the route.
    req.user = loggedUser;
    next();
  }