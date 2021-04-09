import { ADD_CLIENT, SHOW_CLIENT } from "../types/clientTypes";

const clientReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_CLIENT:
      return [
        ...state,
        action.payload
      ];

    case ADD_CLIENT:
      return action.payload;

    default:
      return state
  }
}

export default clientReducer;
