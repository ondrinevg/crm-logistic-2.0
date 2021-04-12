import { call, put, takeLatest } from 'redux-saga/effects';
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
    const users = yield call(getUsersFromServer, action.payload);
    yield put(showUsers(users));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* showUsersSagaWatcher() {
  yield takeLatest(SHOW_ALL_USERS_SAGA, usersSagaWorker);
}

export default showUsersSagaWatcher;