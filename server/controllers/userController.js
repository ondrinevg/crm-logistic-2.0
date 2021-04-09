const bcrypt = require('bcrypt');
const User = require('../db/models/user');
const app = require('../app');

const saltRound = 10;

const userLoginRender = async (req, res) => {
  try {
    const { id } = res.locals;
    const userId = await User.findById(id);
    res.status(200).json(userId);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const userRegister = async (req, res) => {
  try {
    const {
      name,
      lastname,
      middlename,
      phone,
      email,
      password,
      role,
    } = req.body;
    if (email && password && name && lastname && middlename && phone && role) {
      const pass = await bcrypt.hash(password, saltRound);
      const newUser = await User.create({
        name,
        lastname,
        middlename,
        phone,
        email,
        password: pass,
        role,
      });

      req.session.user = {
        id: newUser._id,
      };

      return res.sendStatus(200);
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

module.exports = {
  userLoginRender,
  userRegister,
  userLogin,
  userLogout,
};
