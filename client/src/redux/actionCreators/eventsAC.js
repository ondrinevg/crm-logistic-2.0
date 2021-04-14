import { GET_EVENTS, GET_EVENTS_SAGA } from '../types/eventType';

export const getEvents = (events) => {
  return {
    type: GET_EVENTS,
    payload: events,
  }
}

export const getEventsSaga = () => ({ type: GET_EVENTS_SAGA });
