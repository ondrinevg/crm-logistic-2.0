import { call, put, takeLatest } from 'redux-saga/effects';
import { changeLoadStatus } from '../../actionCreators/loadAC';
import { editUser } from '../../actionCreators/usersAC';
import { EDIT_USER_SAGA } from '../../types/userType';

const editUserFromServer = ({userInfo, id}) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/users/${id}`, {
    credentials: 'include',
    method: 'PATCH',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then(response => response.json())
}


function* editUserSagaWorker(action) {
  try {
    yield put(changeLoadStatus(true));
    const user = yield call(editUserFromServer, action.payload);
    yield put(editUser(user));
    yield put(changeLoadStatus(false));
  } catch (e) {
    yield put(changeLoadStatus(false));
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* editUserSagaWatcher() {
  yield takeLatest(EDIT_USER_SAGA, editUserSagaWorker);
}

export default editUserSagaWatcher;