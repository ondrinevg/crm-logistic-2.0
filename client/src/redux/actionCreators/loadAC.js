import { SET_LOADING } from "../types/loaderTypes"


export const changeLoadStatus = (status) => {
  return {
    type: SET_LOADING,
    payload: status
  }
}
