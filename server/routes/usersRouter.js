const userRouter = require('express').Router();
const {
  userLogout,
  userRegister,
  userLoginRender,
  getManagers,
  getUser,
  editUser,
} = require('../controllers/userController');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkAuth } = require('../middlewares/checkAuth');

userRouter.route('/')
  .get(checkAuth, getUser);

userRouter.route('/adminPanel')
  .get(checkAuth, checkAdmin, getManagers)
  .post(checkAuth, checkAdmin, userRegister);

userRouter.route('/login')
  .get(userLoginRender);

userRouter.route('/logout')
  .get(checkAuth, userLogout);

userRouter.route('/:id')
  .patch(checkAuth, checkAdmin, editUser);

module.exports = userRouter;
