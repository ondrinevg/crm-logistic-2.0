const bcrypt = require('bcrypt');
const User = require('../db/models/user');
const app = require('../app');

const userLoginRender = async (req, res) => {
  try {
    const { id } = res.locals;
    const userId = await User.findById(id);
    res.status(200).json(userId);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getManagers = async (req, res) => {
  try {
    const users = (await User.find()).map((user) => ({
      role: user.role,
      email: user.email,
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      middleName: user.middleName,
      photo: user.photo,
      phone: user.phone,
    }));

    res.json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const userRegister = async (req, res) => {
  try {
    const {
      name,
      lastName,
      middleName,
      phone,
      email,
      role,
    } = req.body;
    if (email && name && lastName && middleName && phone && role) {
      const newUser = await User.create({
        name,
        lastName,
        middleName,
        phone,
        email,
        role,
      });

      return res.json(newUser);
    }
    return res.sendStatus(418);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const currentUser = await User.findOne({ email });
      if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
        req.session.user = {
          id: currentUser._id,
        };

        return res.sendStatus(200);
      }
      return res.sendStatus(418);
    }
    return res.sendStatus(418);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const userLogout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) return res.redirect('/');

      res.clearCookie(app.get('cookieName'));
      return res.sendStatus(200);
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteUserEmail = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    delete user.email;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const editUser = async (req, res) => {
  try {
    console.log('======', req.body);
    const { id } = req.params;
    if (req.body.deletemail) {
      const user = await User.findByIdAndUpdate(id, { email: '' });
      await user.save();
      return res.json({
        role: user.role,
        _id: user._id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        middleName: user.middleName,
        photo: user.photo,
        phone: user.phone,
      });
    }
    if (Object.keys(req.body).every((key) => req.body[key].trim())) {
      const editedUser = await User.findByIdAndUpdate(id, { ...req.body }, { new: true });
      return res.json({
        role: editedUser.role,
        _id: editedUser._id,
        email: editedUser.email,
        name: editedUser.name,
        lastName: editedUser.lastName,
        middleName: editedUser.middleName,
        photo: editedUser.photo,
        phone: editedUser.phone,
      });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  userLoginRender,
  userRegister,
  userLogin,
  userLogout,
  getManagers,
  getUser,
  deleteUserEmail,
  editUser,
};
