const userRouter = require('express').Router();
const {
  userLogin,
  userLogout,
  userRegister,
  userLoginRender,
  getManagers,
  getUser,
  // deleteUserEmail,
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
  .get(userLoginRender)
  .post(userLogin);

userRouter.route('/logout')
  .get(checkAuth, userLogout);

userRouter.route('/:id')
  // .patch(checkAuth, checkAdmin, deleteUserEmail)
  .patch(checkAuth, checkAdmin, editUser);

module.exports = userRouter;
