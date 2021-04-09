import { ADD_CLIENT, SHOW_CLIENT, EDIT_CLIENT, DELETE_CLIENT } from "../types/clientTypes";

const clientReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_CLIENT:
      return [
        ...state,
        action.payload
      ];

    case ADD_CLIENT:
      return action.payload;

    case EDIT_CLIENT:
      return action.payload;

    case DELETE_CLIENT:
      return {};

    default:
      return state
  }
}

export default clientReducer;
