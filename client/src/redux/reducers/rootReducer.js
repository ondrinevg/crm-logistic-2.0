import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import clientsReducer from './clientsReducer';
import ordersReducer from './ordersReducer';
import orderReducer from './orderReducer';
import usersReducer from './userReducer';



const rootReducer = combineReducers({
  client: clientReducer,
  clients: clientsReducer,
  order: orderReducer,
  orders: ordersReducer,
  user: usersReducer,
})

export default rootReducer;
