import { ADD_COMMENT_ORDER, ADD_ORDER, DELETE_ORDER, EDIT_ORDER, FIND_CLIENTS_FOR_NEW_ORDER, SHOW_ORDER } from '../types/orderTypes'

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_ORDER:
      return action.payload;

    case ADD_ORDER:
      return action.payload;

    case EDIT_ORDER:
      return action.payload;

    case ADD_COMMENT_ORDER:
      return action.payload;

    case DELETE_ORDER:
      return {};

    case FIND_CLIENTS_FOR_NEW_ORDER:
      return action.payload;

    default:
      return state;
  }
}

export default orderReducer;
