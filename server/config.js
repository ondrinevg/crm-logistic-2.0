require('dotenv').config();
// const flash = require('connect-flash');
const passport = require('passport');
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

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our own db

    const googleEmail = profile.emails[0].value;
    const photo = profile.photos[0].value;
    const googleId = profile.id;
    const googleName = profile.displayName;

    User.findOneAndUpdate({ email: googleEmail },
      {
        accessToken,
        photo,
        googleName,
        googleId,
      }, { new: true })
      .then((currentUser) => {
        if (currentUser) {
          // already have this user
          return done(null, currentUser);
        }

        return done(null, false, { message: 'User incorrect!' });
        // User.create({
        //   googleId: profile.id,
        //   googleName: profile.displayName,
        //   email: profile.emails[0].value,
        // }).then((newUser) => {
        //   return done(null, newUser);
        // })
      });
  }),
);

// "anastasiagodun24@gmail.com"
