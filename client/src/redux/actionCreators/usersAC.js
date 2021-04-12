import { DELETE_MAIL, DELETE_MAIL_SAGA, SHOW_ALL_USERS, SHOW_ALL_USERS_SAGA } from "../types/userType";

export const showUsers = (users) => {
  return {
    type: SHOW_ALL_USERS,
    payload: users
  }
}

export const showUsersSaga = () => ({ type: SHOW_ALL_USERS_SAGA });

export const deleteMailSaga = (id) => {
  return {
    type: DELETE_MAIL_SAGA,
    payload: id
  }
}

export const deleteMail = (user) => {
  return {
    type: DELETE_MAIL,
    payload: user
  }
}
