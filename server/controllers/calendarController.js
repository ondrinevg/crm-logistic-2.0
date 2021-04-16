const fetch = require('node-fetch');

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

module.exports = {
  getEventsFromGoogle,
  putEventToGoogle,
  patchEventOnGoogle,
};
