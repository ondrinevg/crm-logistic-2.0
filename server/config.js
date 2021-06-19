require('dotenv').config();
const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./db/models/user');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.OUR_REACT}/api/v1/auth/google/redirect`,
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    const googleEmail = profile.emails[0].value;
    const photo = profile.photos[0].value;
    const googleId = profile.id;
    const googleName = profile.displayName;
    let userForUpdate;

    if (refreshToken) {
      userForUpdate = {
        accessToken,
        refreshToken,
        photo,
        googleName,
        googleId,
      };
    } else {
      userForUpdate = {
        accessToken,
        photo,
        googleName,
        googleId,
      };
    }

    const currentUser = await User.findOneAndUpdate(
      { email: googleEmail },
      userForUpdate,
      { new: true }
    );

    if (currentUser && currentUser.canAccess) {
      return done(null, currentUser);
    }
    return done(null, false, { message: 'User incorrect!' });
  }
);

passport.use(strategy);
refresh.use(strategy);
