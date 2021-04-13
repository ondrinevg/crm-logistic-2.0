import { call, put, takeLatest } from 'redux-saga/effects';
import { changeLoadStatus } from '../../actionCreators/loadAC';
import { deleteMail } from '../../actionCreators/usersAC';
import { DELETE_MAIL_SAGA } from '../../types/userType';

const getEditUserFromServer = (id) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/users/${id}`, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ deletemail: true }),
  })
    .then(response => response.json())
};

function* deleteEmailSagaWorker(action) {
  try {
    yield put(changeLoadStatus(true));
    const user = yield call(getEditUserFromServer, action.payload);
    yield put(deleteMail(user));
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put(changeLoadStatus(false));
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* deleteMailSagaWatcher() {
  yield takeLatest(DELETE_MAIL_SAGA, deleteEmailSagaWorker);
}

export default deleteMailSagaWatcher;
