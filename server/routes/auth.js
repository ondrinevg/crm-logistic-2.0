const passport = require('passport');
const express = require('express');
require('dotenv').config();

const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
  prompt: 'select_account',
  accessType: 'offline',
  // approvalPrompt: 'force'
}));
router.get('/google/redirect', passport.authenticate('google', {
  successRedirect: `${process.env.OUR_URL}`,
  failureRedirect: `${process.env.OUR_REACT}/api/v1/auth/google`,
  failureFlash: true,
}));

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  // res.clearCookie('cookieName');

  return res.redirect(`${process.env.OUR_URL}`);
});

module.exports = router;
