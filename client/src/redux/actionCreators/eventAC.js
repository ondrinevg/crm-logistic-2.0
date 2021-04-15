import { ADD_EVENT, ADD_EVENT_SAGA, EDIT_EVENT, EDIT_EVENT_SAGA } from '../types/eventType';

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

export const addEvent = () => {
  return {
    type: ADD_EVENT,
  }
};

export const addEventSaga = (event) => {
  return {
    type: ADD_EVENT_SAGA,
    payload: event, 
  }
};
