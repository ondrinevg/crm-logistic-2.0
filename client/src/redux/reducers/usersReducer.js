import { DELETE_MAIL, SHOW_ALL_USERS } from "../types/userType";


const usersReducer = (state = [], action) => {
  switch (action.type) {
    case SHOW_ALL_USERS:
      return action.payload;

      case DELETE_MAIL:
        return state.map( el => el._id === action.payload._id ? action.payload : el)

    default:
      return state
  }
}

export default usersReducer;
