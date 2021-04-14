import { call, put, takeLatest, debounce } from 'redux-saga/effects';
import { getEvents } from '../../actionCreators/eventsAC';
import { changeLoadStatus } from '../../actionCreators/loadAC';
import { GET_EVENTS_SAGA } from '../../types/eventType';

const getAllEventsFromServer = () => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/managers/token`, {
    credentials: "include",
  }).then((data) => data.json())
};

function* eventsSagaWorker(action) {
  try {
    yield put(changeLoadStatus(true));
    const events = yield call(getAllEventsFromServer, action.payload);
    console.log(events);
    yield put(getEvents(events));
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put(changeLoadStatus(false));
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* getEventsSagaWatcher() {
  yield takeLatest(GET_EVENTS_SAGA, eventsSagaWorker);
}

export default getEventsSagaWatcher;
