import { SHOW_ALL_CLIENTS, SHOW_ALL_CLIENTS_SAGA } from '../types/clientsTypes'

export const showAllClients = (clients) => {
  return {
    type: SHOW_ALL_CLIENTS,
    payload: clients
  }
}

export const showAllClientsSaga = () => ({ type: SHOW_ALL_CLIENTS_SAGA });
