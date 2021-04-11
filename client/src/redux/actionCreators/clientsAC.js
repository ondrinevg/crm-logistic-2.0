import {
  CLEARE_CLIENTS_STATE,
  SEARCH_CLIENTS,
  SEARCH_CLIENTS_SAGA,
  SHOW_ALL_CLIENTS,
  SHOW_ALL_CLIENTS_SAGA
} from '../types/clientsTypes'

export const showAllClients = (clients) => {
  return {
    type: SHOW_ALL_CLIENTS,
    payload: clients
  }
}

export const showAllClientsSaga = () => ({ type: SHOW_ALL_CLIENTS_SAGA });

export const searchClients = (clients) => {
  return {
    type: SEARCH_CLIENTS,
    payload: clients
  }
}

export const searchClientsSaga = (text) => {
  return {
    type: SEARCH_CLIENTS_SAGA,
    payload: text
  }
}

export const cleareClientsState = () => {
  return {
    type: CLEARE_CLIENTS_STATE,
  };
};
