import React, { useEffect } from 'react'

export default function Calendare() {
  const style = {
    border: 0,

  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/managers/token`, {
      credentials: "include",
    })
      .then((response) => response.json())
     .then((token) =>
        fetch(`https://www.googleapis.com/calendar/v3/calendars/uudmopujkodqksbu55au8opt3k@group.calendar.google.com/events`, {
          credentials: 'include',
          headers: {
            Authorization: 'Bearer ' + token,
          },         
        })
        .then((data) => data.json()).then((data) => console.log(data))
      )
  }, [])

  return (
    // <div>Здесь будет календарь</div>
    <iframe src="https://calendar.google.com/calendar/embed?src=uudmopujkodqksbu55au8opt3k%40group.calendar.google.com&ctz=Europe%2FMoscow" className={style.border} width="800" height="600" frameBorder="0" scrolling="no"></iframe>
  )
}

