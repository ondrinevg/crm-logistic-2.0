const fetch = require('node-fetch');
const refresh = require('passport-oauth2-refresh');
const User = require('../db/models/user');

const getEventsFromGoogle = async (req, res) => {
  return fetch(`https://www.googleapis.com/calendar/v3/calendars/${process.env.GOOGLE_CALENDAR_ID}/events`, {
    headers: {
      Authorization: `Bearer ${req.user.accessToken}`,
    },
  });
};

const putEventToGoogle = async (req, res) => {
  return fetch(`https://www.googleapis.com/calendar/v3/calendars/${process.env.GOOGLE_CALENDAR_ID}/events?key=${process.env.API_KEY}`, {
    headers: {
      Authorization: `Bearer ${req.user.accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(req.body)
  });
};

const patchEventOnGoogle = async (req, res) => {
  const eventId = Object.keys(req.body)[0];
  let newEvent;
  if (req.body[eventId].hasOwnProperty('notes')) {
    if (req.body[eventId].hasOwnProperty('startDate')) {
      newEvent = {
        start: {
          dateTime: req.body[eventId].startDate,
          timeZone: 'Europe/Moscow',
        },
        end: {
          dateTime: req.body[eventId].endDate,
          timeZone: 'Europe/Moscow'
        },
        description: req.body[eventId].notes,
      };
    } else {
      newEvent = {
        description: req.body[eventId].notes,
      };
    }
  } else {
    newEvent = {
      start: {
        dateTime: req.body[eventId].startDate,
        timeZone: 'Europe/Moscow',
      },
      end: {
        dateTime: req.body[eventId].endDate,
        timeZone: 'Europe/Moscow'
      },
    };
  }
  return fetch(`https://www.googleapis.com/calendar/v3/calendars/${process.env.GOOGLE_CALENDAR_ID}/events/${eventId}?key=${process.env.API_KEY}`, {
    headers: {
      Authorization: `Bearer ${req.user.accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: 'PATCH',
    body: JSON.stringify(newEvent)
  });
};

const getEvents = async (req, res) => {
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
};

const createEvent = async (req, res) => {
  try {
    const response = await putEventToGoogle(req, res);
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
        const newStatus = await putEventToGoogle(req, res);
        if (newStatus === 200) return res.sendStatus(200);
        return res.sendStatus(400);
      });
    }
  } catch (error) {
    return res.sendStatus(400);
  }
  return res.sendStatus(400);
};

const patchEvent = async (req, res) => {
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
};

module.exports = {
  getEvents,
  createEvent,
  patchEvent,
};
