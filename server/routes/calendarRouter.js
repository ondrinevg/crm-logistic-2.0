const userRouter = require('express').Router();
const { getEvents, createEvent, patchEvent } = require('../controllers/calendarController');

const { checkAuth } = require('../middlewares/checkAuth');

userRouter.route('/token')
  .get(checkAuth, getEvents)
  .post(checkAuth, createEvent)
  .patch(checkAuth, patchEvent);

module.exports = userRouter;
