const jwt = require('jsonwebtoken');
const config = require('config');

//middelware is basically just a function that has access to the req and responce objects

module.exports = function(req, res, next) {
  //get the token from the header

  const token = req.header('x-auth-token');

  //check if no token

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // verify token

  try {
    const decoded = jwt.verify(token, config.get('jwtsecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid' });
  }
};
