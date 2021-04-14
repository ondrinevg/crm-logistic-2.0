/* eslint-disable max-len */
require('dotenv').config();
const flash = require('connect-flash');
const express = require('express');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
// const logger = require('morgan');
const cors = require('cors');
const { connect } = require('mongoose');
const passport = require('passport');
const googleConfig = require('./config');


const User = require('./db/models/user');

const authRouter = require('./routes/auth');
const ordersRouter = require('./routes/ordersRouter');
const clientsRouter = require('./routes/clientsRouter');
const usersRouter = require('./routes/usersRouter');
const calendarRouter = require('./routes/calendarRouter');

const app = express();

app.set('cookieName', 'sid');

// app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(sessions({
  name: app.get('cookieName'),
  secret: process.env.SECRET_KEY,
  resave: false, // Не сохранять сессию, если мы ее не изменим
  saveUninitialized: false, // не сохранять пустую сессию
  store: MongoStore.create({ // выбираем в качестве хранилища mongoDB
    mongoUrl: process.env.DB_CONNECTION_CLOUD,
  }),
  cookie: { // настройки, необходимые для корректного работы cookie
    httpOnly: true, // не разрещаем модифицировать данную cookie через javascript
    maxAge: 86400 * 1e3, // устанавливаем время жизни cookie
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(async (req, res, next) => {
  const userId = req.session?.user?.id;
  if (userId) {
    const currentUser = await User.findById(userId);
    if (currentUser) {
      res.locals.name = currentUser.name;
      res.locals.lastname = currentUser.lastname;
      res.locals.middlname = currentUser.middlename;
      res.locals.id = currentUser._id;
      res.locals.admin = currentUser.role === 'admin';
      res.locals.manager = currentUser.role === 'manager';
    }
  }
  next();
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/clients', clientsRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/managers', calendarRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(
  PORT,
  () => {
    console.log(`Server started on port ${PORT}.`);

    connect(process.env.DB_CONNECTION_CLOUD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }, () => {
      console.log('Connection to databse is successful.');
    });
  },
);

module.exports = app;
