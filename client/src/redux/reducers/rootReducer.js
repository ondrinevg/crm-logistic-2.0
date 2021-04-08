import { combineReducers } from 'redux';
import clientRouter from './clientReducer';
import clientsRouter from './clientsReducer';
import ordersRouter from './ordersReducer';
import orderRouter from './orderReducer';


const rootReducer = combineReducers({
  client: clientRouter,
  clients: clientsRouter,
  order: orderRouter,
  orders: ordersRouter,
})

export default rootReducer;
