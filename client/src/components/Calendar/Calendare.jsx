import React, { useEffect } from 'react'

export default function Calendare() {
  const style = {
    border: 0,

  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/managers/token`)
      .then((token) =>
        fetch(`https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_GOOGLE_CALENDARE_ID}/events`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((data) => data.json()).then((data) => console.log(data))
      )
  }, [])

  return (
    <div>Здесь будет календарь</div>
    // <iframe src="https://calendar.google.com/calendar/embed?src=uudmopujkodqksbu55au8opt3k%40group.calendar.google.com&ctz=Europe%2FMoscow" className={style.border} width="800" height="600" frameBorder="0" scrolling="no"></iframe>
  )
}

