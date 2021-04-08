import { ADD_ORDER, SHOW_ORDER } from '../types/orderTypes'

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_ORDER:
      return action.payload;  

    case ADD_ORDER:
      return action.payload;

    default:
      return state;
  }
}

export default orderReducer;
