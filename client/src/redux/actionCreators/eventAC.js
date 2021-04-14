import { EDIT_EVENT, EDIT_EVENT_SAGA } from '../types/eventType';

export const editEvent = () => {
  return {
    type: EDIT_EVENT,
  }
}

export const editEventSaga = (event) => {
  return {
    type: EDIT_EVENT_SAGA,
    payload: event, 
  }
};
