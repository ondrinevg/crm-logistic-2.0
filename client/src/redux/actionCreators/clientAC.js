import { SHOW_CLIENT, SHOW_CLIENT_SAGA } from '../types/clientTypes'

export const showClient = (client) => {
  return {
    type: SHOW_CLIENT,
    payload: client,
  }
}

export const showClientSaga = (id) => {
  return {
    type: SHOW_CLIENT_SAGA,
    payload: id
  };
}
