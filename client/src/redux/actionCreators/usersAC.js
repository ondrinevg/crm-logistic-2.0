import { SHOW_ALL_USERS, SHOW_ALL_USERS_SAGA } from "../types/userType";

export const showUsers = (users) => {
  return {
    type: SHOW_ALL_USERS,
    payload: users
  }
}

export const showUsersSaga = () => ({ type: SHOW_ALL_USERS_SAGA });