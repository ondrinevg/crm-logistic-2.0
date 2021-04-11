require('dotenv').config();

const checkAuth = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.sendStatus(401);
  // return res.redirect(`http://localhost:${process.env.PORT}/api/v1/auth/google`);
};

module.exports = {
  checkAuth,
};

// const User = require("../models/users.model")

// const checkAuth = async (req, res, next) => {
//   const userId = req.session?.user?.id

//   if (userId) {
//     const currentUser = await User.findById(userId)
//     req.userRole = currentUser.role
//     return next()
//   }

//   return res.redirect('/user/signup')
// }

// module.exports = {
//   checkAuth,
// }
