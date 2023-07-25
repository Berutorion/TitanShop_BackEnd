const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { Users } = require('../models');

require('dotenv').config();
// Local
passport.use(
  new LocalStrategy(
    { usernameField: 'account', passwordField: 'password' },
    async (account, password, done) => {
      try {
        const user = await Users.findOne({ where: { account } });
        if (!user) return done(null, false, { message: '使用者不存在' });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return done(null, false, { message: '密碼錯誤' });
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    },
  ),
);

const JWToption = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

// JWT
passport.use(
  new JwtStrategy(JWToption, async (jwtPayload, done) => {
    try {
      const user = await Users.findOne({ where: { name: jwtPayload.name } });
      if (!user) throw new Error('使用者不存在');
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }),
);

module.exports = passport;
