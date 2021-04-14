const userRouter = require('express').Router();
const fetch = require('node-fetch');

const { checkAuth } = require('../middlewares/checkAuth');

userRouter.route('/token')
  .post(checkAuth, async (req, res) => {
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${process.env.GOOGLE_CALENDARE_ID}/events?key=${process.env.API_KEY}`, {
      headers: {
        Authorization: `Bearer ${req.user.accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify(req.body)
    }).then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(400));
  })
  .patch(checkAuth, async (req, res) => {
    console.log(req.body);
    const eventId = Object.keys(req.body)[0];
    const start = {
      dateTime: req.body[eventId].startDate,
      timeZone: 'Europe/Moscow',
    };
    const end = {
      dateTime: req.body[eventId].endDate,
      timeZone: 'Europe/Moscow'
    };
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${process.env.GOOGLE_CALENDARE_ID}/events/${eventId}?key=${process.env.API_KEY}`, {
      headers: {
        Authorization: `Bearer ${req.user.accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: 'PATCH',
      body: JSON.stringify({ start, end })
    }).then((data) => {
      console.log(data);
      res.sendStatus(200);
    })
      .catch(() => res.sendStatus(400));
  })


module.exports = userRouter;
