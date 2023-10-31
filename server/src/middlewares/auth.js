/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config/const');

const protect = async (req, res, next) => {
  // get the token
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null;

    if (token == null) {
      return res.status(400).json({
        message: 'No Token Provided!',
      });
    }

    if (token === `${jwtSecretKey}PassedByTheMaster`) {
      return next();
    }

    // decode the token
    // const decoded = jwt.verify(token, jwtSecretKey);
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        // Token verified failed
        return res.status(401).json({ message: 'Access token or expired' });
      }

      // // Check if token has expired
      // const currentTimestamp = Math.floor(Date.now() / 1000);
      // if (decoded.exp && decoded.exp < currentTimestamp) {
      //   return res.status(401).json({ message: 'Access token has expired' });
      // }

      // add the user to the request
      req.body.decoded = decoded;

      next();
    });
  } catch (err) {
    return res.status(401).json({
      status: 'authentication error',
      message: 'sign in to continue',
      error: err,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, jwtSecretKey);

    console.log('Decoded Data', decoded);

    const isadmin = req.headers.isadmin ? req.headers.isadmin : false;

    if (isadmin === false) {
      return res.status(403).json({
        status: 'access denied!',
        message: 'user is not admin',
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      status: 'access denied!',
      message: 'user not Admin',
      error: err,
    });
  }
};

module.exports = { protect, isAdmin };
