import { call, put, takeLatest } from 'redux-saga/effects';
import { SHOW_CLIENT_SAGA } from '../../types/clientTypes'
import { showClient } from '../../actionCreators/clientAC'
import { changeLoadStatus } from '../../actionCreators/loadAC';

const getClientFromServer = (id) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/clients/${id}`, {
    credentials: 'include',
  })
    .then(response => response.json())
};

function* clientSagaWorker(action) {
  try {
    yield put(changeLoadStatus(true));
    const client = yield call(getClientFromServer, action.payload);
    yield put(showClient(client));
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put(changeLoadStatus(false));
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* showClientSagaWatcher() {
  yield takeLatest(SHOW_CLIENT_SAGA, clientSagaWorker);
}

export default showClientSagaWatcher;
