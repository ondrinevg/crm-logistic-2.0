require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./db/models/user');

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our own db
    const googlEmail = profile.emails[0].value;
    User.findOne({ email: googlEmail }).then((currentUser) => {
      if (currentUser) {
        // already have this user
        // console.log('user is: ', currentUser)
        return done(null, currentUser);
      }
      return done(null, false, { message: 'Incorrect user' });
    });
  }),
);
