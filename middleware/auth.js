// create local strategy middleware
const passport = require('../config/passport');

const LoginAuth = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });
    req.user = user;
    next();
  })(req, res, next);
};

const JWTAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: '未登入' });
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { LoginAuth, JWTAuth };
