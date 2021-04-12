import {
  INIT_USER,
  
} from "../types/userType";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case INIT_USER:
      return action.payload;

    default:
      return state
  }
}

export default userReducer;
