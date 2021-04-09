import { SEARCH_ORDERS, SHOW_ALL_ORDERS } from '../types/ordersTypes'

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case SHOW_ALL_ORDERS:
      return [
        ...action.payload
      ];

    case SEARCH_ORDERS:
      return [
        ...action.payload
      ];

    default:
      return state;
  }
}

export default ordersReducer;
