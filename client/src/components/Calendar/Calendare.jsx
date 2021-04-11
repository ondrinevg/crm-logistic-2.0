import React, { useEffect } from 'react'

export default function Calendare() {
  const style = {
    border: 0,

  }

  useEffect(() => {
    fetch(`https://www.googleapis.com/calendar/v3/calendars/uudmopujkodqksbu55au8opt3k@group.calendar.google.com/events`, {
      headers: {
        Authorization: 'Bearer ' + 'ya29.a0AfH6SMAiY4KhNsHMM0qse3wql30M513xRt2HllgKldOfTzd10M2Wr4uhJzHiQGTn7JnrV3ttvQ4SAyuIHeoY4jjoQzFP_yMJB4HHxlEcfYPhysTYGV-NY6nV0I4iARYq3lpTHbb5h0ElfPZ4RP3iYw72Mm_C',
      },
    }).then((data) => data.json()).then((data) => console.log(data))
  }, [])

  return (
    <div>Здесь будет календарь</div>
    // <iframe src="https://calendar.google.com/calendar/embed?src=uudmopujkodqksbu55au8opt3k%40group.calendar.google.com&ctz=Europe%2FMoscow" className={style.border} width="800" height="600" frameBorder="0" scrolling="no"></iframe>
  )
}

