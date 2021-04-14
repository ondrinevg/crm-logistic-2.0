const passport = require('passport');
const express = require('express');

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
  accessType: 'offline', 
  // approvalPrompt: 'force'
}));
// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000',
  failureRedirect: 'http://localhost:3001/api/v1/auth/google',
  failureFlash: true,
}));

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  // res.clearCookie('cookieName');

  return res.redirect('http://localhost:3000');
});

module.exports = router;
