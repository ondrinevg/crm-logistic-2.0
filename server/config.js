require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./db/models/user');

passport.serializeUser((user, done) => {
  console.log(user, '<<<7str');
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
    console.log('profile new user: ', profile)
    const googlEmail = profile.emails[0].value;
    User.findOneAndUpdate({ email: googlEmail }, { accessToken }, { new: true })
      .then((currentUser) => {
        console.log(currentUser, '<<<<<<<<<<<<<<current');
        if (currentUser) {
          // already have this user
          console.log('user is: ', currentUser)
          console.log('accessToken', accessToken);
          return done(null, currentUser);
        } else {
          return done(null, false, { message: 'Incorrect user' })
          console.log(profile, "<<<<<profile")
          User.create({
            googleId: profile.id,
            googleName: profile.displayName,
            email: profile.emails[0].value,
          }).then((newUser) => {
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<created new user: ', newUser)
            return done(null, newUser);
          })
        }
        ;
      });
  }),
);

// "anastasiagodun24@gmail.com"
