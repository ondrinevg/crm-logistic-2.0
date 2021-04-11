import { call, put, takeLatest } from 'redux-saga/effects';
import { addCommentToClient } from '../../actionCreators/clientAC';
import { ADD_COMMENT_CLIENT_SAGA } from '../../types/clientTypes';

const addCommentClientToServer = ({text, id}) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/clients/${id}/comments`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({text}),
  })
    .then(response => response.json())
}


function* clientSagaWorker(action) {
  try {
    const client = yield call(addCommentClientToServer, action.payload);
    yield put(addCommentToClient(client));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* addCommentToClientSagaWatcher() {
  yield takeLatest(ADD_COMMENT_CLIENT_SAGA, clientSagaWorker);
}

export default addCommentToClientSagaWatcher;
