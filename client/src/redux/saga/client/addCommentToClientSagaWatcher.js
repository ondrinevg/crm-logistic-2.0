import { call, put, takeLatest } from 'redux-saga/effects';
import { addCommentToClient } from '../../actionCreators/clientAC';
import { ADD_COMMENT_CLIENT_SAGA } from '../../types/clientTypes';

const editClientToServer = ({text, id}) => {
  return fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/clients/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(text),
  })
    .then(response => response.json())
}


function* clientSagaWorker(action) {
  try {
    const client = yield call(editClientToServer, action.payload);
    yield put(addCommentToClient(client));
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* addCommentToClientSagaWatcher() {
  yield takeLatest(ADD_COMMENT_CLIENT_SAGA, clientSagaWorker);
}

export default addCommentToClientSagaWatcher;
