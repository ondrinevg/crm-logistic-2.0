import { SHOW_ALL_USERS } from "../types/userType";


const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_ALL_USERS:
      return action.payload;

    default:
      return state
  }
}

export default usersReducer;
