import {
  ADD_CLIENT,
  ADD_CLIENT_SAGA,
  SHOW_CLIENT,
  SHOW_CLIENT_SAGA,
  EDIT_CLIENT,
  EDIT_CLIENT_SAGA,
  DELETE_CLIENT,
  DELETE_CLIENT_SAGA,
  ADD_COMMENT_CLIENT,
  ADD_COMMENT_CLIENT_SAGA,
  CLEARE_CLIENT_STATE,
} from '../types/clientTypes';

export const showClient = (client) => {
  return {
    type: SHOW_CLIENT,
    payload: client,
  };
};

export const showClientSaga = (id) => {
  return {
    type: SHOW_CLIENT_SAGA,
    payload: id
  };
};

export const addClient = (client) => {
  return {
    type: ADD_CLIENT,
    payload: client,
  };
};

export const addClientSaga = (client) => {
  return {
    type: ADD_CLIENT_SAGA,
    payload: client,
  };
};

export const editClient = (client) => {
  return {
    type: EDIT_CLIENT,
    payload: client,
  };
};

export const editClientSaga = (client, id) => {
  return {
    type: EDIT_CLIENT_SAGA,
    payload: {
      client,
      id,
    }
  };
};

export const deleteClient = () => {
  return {
    type: DELETE_CLIENT,
  };
};

export const deleteClientSaga = (id) => {
  return {
    type: DELETE_CLIENT_SAGA,
    payload: id,
  };
};

export const addCommentToClient = (client) => {
  return {
    type: ADD_COMMENT_CLIENT,
    payload: client,
  };
};

export const addCommentToClientSaga = (id, text) => {
  return {
    type: ADD_COMMENT_CLIENT_SAGA,
    payload: {
      text,
      id,
    }
  };
};

export const cleareClientState = () => {
  return {
    type: CLEARE_CLIENT_STATE,
  };
};
