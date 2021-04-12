import { combineReducers } from 'redux';
import clientRouter from './clientReducer';
import clientsRouter from './clientsReducer';
import ordersRouter from './ordersReducer';
import orderRouter from './orderReducer';
import usersReducer from './usersReducer';



const rootReducer = combineReducers({
  client: clientRouter,
  clients: clientsRouter,
  order: orderRouter,
  orders: ordersRouter,
  users: usersReducer,
})

export default rootReducer;
