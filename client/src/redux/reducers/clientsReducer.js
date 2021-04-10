import { CLEARE_CLIENTS_STATE, SEARCH_CLIENTS, SHOW_ALL_CLIENTS } from '../types/clientsTypes'
import { FIND_CLIENTS_FOR_NEW_ORDER } from '../types/orderTypes';

const clientsReducer = (state = [], action) => {
  switch (action.type) {
    case SHOW_ALL_CLIENTS:
      return [
        ...action.payload
      ];

    case SEARCH_CLIENTS:
      return [
        ...action.payload
      ]

    case FIND_CLIENTS_FOR_NEW_ORDER:
      return action.payload;

    case CLEARE_CLIENTS_STATE:
      return [];

    default:
      return state
  }
}

export default clientsReducer;
