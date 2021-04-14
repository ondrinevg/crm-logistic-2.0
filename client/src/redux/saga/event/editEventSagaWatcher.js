import { call, debounce, put } from 'redux-saga/effects';
import { changeLoadStatus } from '../../actionCreators/loadAC';
import { EDIT_EVENT_SAGA } from '../../types/eventType';
import { editEvent } from '../../actionCreators/eventAC';

const editEventOnGoogle = (event) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/managers/token`, {
    credentials: "include",
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
};

function* eventSagaWorker(action) {
  try {
    yield put(changeLoadStatus(true));
    yield call(editEventOnGoogle, action.payload);
    yield put(editEvent());
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put(changeLoadStatus(false));
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* editEventSagaWatcher() {
  yield debounce(500, EDIT_EVENT_SAGA, eventSagaWorker);
}

export default editEventSagaWatcher;
