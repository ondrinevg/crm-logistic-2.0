import { ADD_USER, ADD_USER_SAGA, INIT_USER, INIT_USER_SAGA } from "../types/userType";

export const initUser = (user) => {
  return {
    type: INIT_USER,
    payload: user,
  };
};

export const initUserSaga = () => {
  return {
    type: INIT_USER_SAGA,
  };
};

export const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

export const addUserSaga = (user) => {
  return {
    type: ADD_USER_SAGA,
    payload: user,
  };
};
