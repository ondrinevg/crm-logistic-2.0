import {
  ADD_CLIENT,
  
} from "../types/userType";

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_CLIENT:
      return action.payload;

    case ADD_CLIENT:
      return action.payload;

    case EDIT_CLIENT:
      return action.payload;

    case ADD_COMMENT_CLIENT:
      return action.payload;

    case DELETE_CLIENT:
      return {};

    case CLEARE_CLIENT_STATE:
      return [];

    default:
      return state
  }
}

export default usersReducer;
