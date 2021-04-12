//Этот скрипт используется для создания Событий в Google Calendar. В форме Заказа мы можем сразу прикрутить Форму с кнопкой для создания Событий Доставка/Сборка/Встреча с Клиентом - Продажа/Встреча с Клиентом - Рекламация

// Require google from googleapis package.
const { google } = require('googleapis')

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth

// Create a new instance of oAuth and set our Client ID & Client Secret.
const oAuth2Client = new OAuth2(
  '940485179206-hn2qtvothvl8uo0ft2l0up54c98mf35h.apps.googleusercontent.com',
  'kSZmv8yJrEw98rUv4VBKO9Vw'
)

// Call the setCredentials method on our oAuth2Client instance and set our refresh token.
oAuth2Client.setCredentials({
  refresh_token: '1//04vJxt7_3pGPzCgYIARAAGAQSNwF-L9IrekFJ7EKxDwBuNymXYiJUB48RnFgbTrB2CSGDxntqi4LZZlat0ZWEJKzvMJeYp1EGEj8',
})

// Create a new calender instance.
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

// Create a new event start date instance for temp uses in our calendar.
const eventStartTime = new Date('2021-04-12')
eventStartTime.setDate(eventStartTime.getDate())

// Create a new event end date instance for temp uses in our calendar.
const eventEndTime = new Date('2021-04-13')
eventEndTime.setDate(eventEndTime.getDate())
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

// Create a dummy event for temp uses in our calendar
const event = {
  summary: `Встреча с Семеном`,
  location: `Москва, кампус Эльбрус`,
  description: `Как отобразить красивый календарь на Сайте`,
  colorId: 1,
  start: {
    dateTime: eventStartTime,
    timeZone: 'Russia/Moscow',
  },
  end: {
    dateTime: eventEndTime,
    timeZone: 'Russia/Moscow',
  },
}

// Check if we a busy and have an event on our calendar for the same time.
calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: 'Russia/Moscow',
      items: [{ id: 'primary' }],
    },
  },
  (err, res) => {
    // Check for errors in our query and log them if they exist.
    if (err) return console.error('Free Busy Query Error: ', err)

    // Create an array of all events on our calendar during that time.
    const eventArr = res.data.calendars.primary.busy

    // Check if event array is empty which means we are not busy
    if (eventArr.length === 0)
      // If we are not busy create a new calendar event.
      return calendar.events.insert(
        { calendarId: 'primary', resource: event },
        err => {
          // Check for errors and log them if they exist.
          if (err) return console.error('Error Creating Calender Event:', err)
          // Else log that the event was created.
          return console.log('Calendar event successfully created.')
        }
      )

    // If event array is not empty log that we are busy.
    return console.log(`Sorry I'm busy...`)
  }
)
