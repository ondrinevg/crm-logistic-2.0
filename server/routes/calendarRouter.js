const userRouter = require('express').Router();
const refresh = require('passport-oauth2-refresh');
const { getEventsFromGoogle, putEventToGoogle, patchEventOnGoogle } = require('../controllers/calendarController');
const User = require('../db/models/user');

const { checkAuth } = require('../middlewares/checkAuth');

userRouter.route('/token')
  .get(checkAuth, async (req, res) => {
    try {
      const response = await getEventsFromGoogle(req, res);
      if (response.status === 200) {
        const data = await response.json();
        return res.json(data.items.map(event => ({
          id: event.id,
          startDate: event.start.dateTime,
          endDate: event.end.dateTime,
          title: event.summary,
          notes: event.description,
        })));
      };
      if (response.status === 401) {
        refresh.requestNewAccessToken('google', req.user.refreshToken, async function (err, accessToken, refreshToken) {
          let userForUpdate;
          if (refreshToken) {
            userForUpdate = {
              accessToken,
              refreshToken,
            }
          } else  userForUpdate = {
            accessToken,
          }
          await User.findByIdAndUpdate(req.user._id, userForUpdate);
          const newResponse = await getEventsFromGoogle(req, res);
          if (newResponse.status === 200) {
            const data = await newResponse.json();
            return res.json(data.items.map(event => ({
              id: event.id,
              startDate: event.start.dateTime,
              endDate: event.end.dateTime,
              title: event.summary,
              notes: event.description,
            })));
          }
          return res.status(response.status).json(response.message);
        });
      }
    } catch (error) {
      return res.status(400).json([]);
    }
    return res.status(400).json([]);
  })
  .post(checkAuth, async (req, res) => {
    try {
      const response = await putEventToGoogle(req, res);
      if (response.status === 200) return res.sendStatus(200);
      if (response.status === 401) {
        console.log('401 post on 60');
        refresh.requestNewAccessToken('google', req.user.refreshToken, async function (err, accessToken, refreshToken) {
          let userForUpdate;
          if (refreshToken) {
            userForUpdate = {
              accessToken,
              refreshToken,
            }
          } else  userForUpdate = {
            accessToken,
          }
          await User.findByIdAndUpdate(req.user._id, userForUpdate);
          const newStatus = await putEventToGoogle(req, res);
          if (newStatus === 200) return res.sendStatus(200);
          return res.sendStatus(400);
        });
      }
    } catch (error) {
      return res.sendStatus(400);
    }
    return res.sendStatus(400);
  })
  .patch(checkAuth, async (req, res) => {
    try {
      const response = await patchEventOnGoogle(req);
      if (response.status === 200) return res.sendStatus(200);
      if (response.status === 401) {
        refresh.requestNewAccessToken('google', req.user.refreshToken, async function (err, accessToken, refreshToken) {
          let userForUpdate;
          if (refreshToken) {
            userForUpdate = {
              accessToken,
              refreshToken,
            }
          } else  userForUpdate = {
            accessToken,
          }
          await User.findByIdAndUpdate(req.user._id, userForUpdate);
          const newStatus = await patchEventOnGoogle(req);
          if (newStatus === 200) return res.sendStatus(200);
          return res.sendStatus(400);
        });
      }
    } catch (error) {
      return res.sendStatus(400);
    }
    return res.sendStatus(400);
  })


module.exports = userRouter;
