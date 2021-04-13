import { combineReducers } from 'redux';
import clientReducer from './clientReducer';
import clientsReducer from './clientsReducer';
import ordersReducer from './ordersReducer';
import orderReducer from './orderReducer';
import usersReducer from './usersReducer';
import userReducer from './userReducer';
import loadReducer from './loadReducer'

const rootReducer = combineReducers({
  client: clientReducer,
  clients: clientsReducer,
  order: orderReducer,
  orders: ordersReducer,
  users: usersReducer,
  user: userReducer,
  loading: loadReducer,
})

export default rootReducer;
