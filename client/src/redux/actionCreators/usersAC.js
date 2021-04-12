import { DELETE_MAIL, DELETE_MAIL_SAGA, SHOW_ALL_USERS, SHOW_ALL_USERS_SAGA, EDIT_USER_SAGA, EDIT_USER } from "../types/userType";

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

export const editUserSaga = (newInfo, id) => {
  return {
    type: EDIT_USER_SAGA,
    payload: {id, newInfo}
  }
}

export const editUser = (editUser) => {
  return {
    type: EDIT_USER,
    payload: editUser
  }
}