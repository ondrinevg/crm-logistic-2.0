import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import clientsReducer from './clientsReducer';
import ordersReducer from './ordersReducer';
import orderReducer from './orderReducer';
import usersReducer from './userReducer';
import userReducer from './userReducer';



const rootReducer = combineReducers({
  client: clientReducer,
  clients: clientsReducer,
  order: ordersReducer,
  orders: orderReducer,
  users: usersReducer,
  user: userReducer,
})

export default rootReducer;
