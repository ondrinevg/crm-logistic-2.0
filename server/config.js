require('dotenv').config();
const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./db/models/user');

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const strategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/v1/auth/google/redirect',
}, (accessToken, refreshToken, profile, done) => {
  const googleEmail = profile.emails[0].value;
  const photo = profile.photos[0].value;
  const googleId = profile.id;
  const googleName = profile.displayName;

  User.findOneAndUpdate({ email: googleEmail },
    {
      accessToken,
      refreshToken,
      photo,
      googleName,
      googleId,
    }, { new: true })
    .then((currentUser) => {
      if (currentUser) {
        return done(null, currentUser);
      }
      return done(null, false, { message: 'User incorrect!' });
    });
});

passport.use(strategy);
refresh.use(strategy);
