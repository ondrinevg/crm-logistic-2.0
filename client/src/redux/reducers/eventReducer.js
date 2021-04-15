import { ADD_EVENT, EDIT_EVENT } from "../types/eventType";

const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_EVENT:
      return {};

    case ADD_EVENT:
      return {};

    default:
      return state;
  }
}

export default eventReducer;
