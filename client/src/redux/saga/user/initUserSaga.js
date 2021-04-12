import { call, put, takeLatest } from 'redux-saga/effects';
import { initUser } from '../../actionCreators/userAC';
import { INIT_USER_SAGA } from '../../types/userType';

const getUserFromServer = () => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/users/`, {
    credentials: 'include',
  })
    .then(response => response.json())
}


function* userSagaWorker(action) {
  try {
    const user = yield call(getUserFromServer, action.payload);
    yield put(initUser(user));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* initUserSagaWatcher() {
  yield takeLatest(INIT_USER_SAGA, userSagaWorker);
}

export default initUserSagaWatcher;
