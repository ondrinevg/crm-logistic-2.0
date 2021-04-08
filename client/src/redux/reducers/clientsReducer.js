import { SHOW_ALL_CLIENTS } from '../types/clientsTypes'

const clientsReducer = (state = [], action) => {
  switch (action.type) {
    case SHOW_ALL_CLIENTS:
      return [
        ...action.payload
      ]  

    default:
      return state
  }
}

export default clientsReducer;
