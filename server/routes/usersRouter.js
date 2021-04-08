const userRouter = require('express').Router();
const {
  userLogin, userLogout, userRegister, userLoginRender,
} = require('../controllers/userController');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkAuth } = require('../middlewares/checkAuth');

userRouter.route('/adminPanel')
  .get(checkAuth, checkAdmin)
  .post(userRegister);
userRouter.route('/adminPanel/registration');

userRouter.route('/login')
  .get(userLoginRender)
  .post(userLogin);

userRouter.route('/logout')
  .get(checkAuth, userLogout);

module.exports = userRouter;
