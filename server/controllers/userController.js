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
    const users = (await User.find()).map(user => {
      role: user.role,
      email: user.email,
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      middleName: user.middleName,
      });

    // const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

const userRegister = async (req, res) => {
  try {
    console.log(req.body);
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
  getManagers,
};
