import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteClient } from '../../actionCreators/clientAC';
import { changeLoadStatus } from '../../actionCreators/loadAC';
import { DELETE_CLIENT_SAGA } from '../../types/clientTypes';

const deleteClientOnServer = (id) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/clients/${id}`, {
    credentials: 'include',
    method: 'DELETE', 
  })
}


function* clientSagaWorker(action) {
  try {
    yield put(changeLoadStatus(true));
    const status = yield call(deleteClientOnServer, action.payload);
    if (status === 200) yield put(deleteClient());
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put(changeLoadStatus(false));
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* deleteClientSagaWatcher() {
  yield takeLatest(DELETE_CLIENT_SAGA, clientSagaWorker);
}

export default deleteClientSagaWatcher;
