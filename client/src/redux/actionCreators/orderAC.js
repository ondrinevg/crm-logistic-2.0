import { SHOW_ORDER, SHOW_ORDER_SAGA } from '../types/orderTypes'

export const showOrder = (order) => {
  return {
    type: SHOW_ORDER,
    payload: order,
  }
}

export const showOrderSaga = (id) => {
  return {
    type: SHOW_ORDER_SAGA,
    payload: id,
  };
};
