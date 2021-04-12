import { call, put, takeLatest } from 'redux-saga/effects';
import { changeLoadStatus } from '../../actionCreators/loadAC';
import { showUsers } from '../../actionCreators/usersAC';
import { SHOW_ALL_USERS_SAGA } from '../../types/userType';

const getUsersFromServer = () => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/users/adminPanel`, {
    credentials: 'include',
  })
    .then(response => response.json())
};

function* usersSagaWorker(action) {
  try {
    yield put(changeLoadStatus(true));
    const users = yield call(getUsersFromServer, action.payload);
    yield put(showUsers(users));
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put(changeLoadStatus(false));
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* showUsersSagaWatcher() {
  yield takeLatest(SHOW_ALL_USERS_SAGA, usersSagaWorker);
}

export default showUsersSagaWatcher;
