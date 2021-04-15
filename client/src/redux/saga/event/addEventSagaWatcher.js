import { call, put, takeLatest } from 'redux-saga/effects';
import { changeLoadStatus } from '../../actionCreators/loadAC';
import { ADD_EVENT_SAGA } from '../../types/eventType';
import { addEvent } from '../../actionCreators/eventAC';

const addEventToGoogle = (event) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/managers/token`, {
    credentials: "include",
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
};

function* eventSagaWorker(action) {
  try {
    yield put(changeLoadStatus(true));
    yield call(addEventToGoogle, action.payload);
    yield put(addEvent());
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put(changeLoadStatus(false));
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* addEventSagaWatcher() {
  yield takeLatest(ADD_EVENT_SAGA, eventSagaWorker);
}

export default addEventSagaWatcher;
