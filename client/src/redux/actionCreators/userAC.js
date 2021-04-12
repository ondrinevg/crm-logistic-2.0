import { INIT_USER, INIT_USER_SAGA } from "../types/userType";

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
