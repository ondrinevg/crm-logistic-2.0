import { call, put, takeLatest } from 'redux-saga/effects';
import { addUser } from '../../actionCreators/userAC';
import { ADD_USER_SAGA } from '../../types/userType';
import { changeLoadStatus } from '../../actionCreators/loadAC'

const getUserFromServer = (user) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/users/adminPanel`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
}


function* userSagaWorker(action) {
  try {
    yield put(changeLoadStatus(true));
    const user = yield call(getUserFromServer, action.payload);
    yield put(addUser(user));
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
    yield put(changeLoadStatus(false));
  }
}

function* addUserSagaWatcher() {
  yield takeLatest(ADD_USER_SAGA, userSagaWorker);
}

export default addUserSagaWatcher;
