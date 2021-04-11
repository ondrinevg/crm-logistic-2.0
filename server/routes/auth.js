const passport = require('passport');
const express = require('express');
const { checkMail } = require('../middlewares/checkMail');

const router = express.Router();// // auth logout

// router.get('/logout', async (req, res) => {
//   await req.logout();
//   res.clearCookie(req.app.get('cookieName'));
//   res.redirect('http://localhost:3000/register').sendStatus(200);
// });
// auth with google+
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
  prompt: 'select_account',
}));
// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000');
});

module.exports = router;
