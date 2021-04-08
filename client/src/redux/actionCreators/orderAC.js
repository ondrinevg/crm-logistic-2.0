import { ADD_ORDER, ADD_ORDER_SAGA, SHOW_ORDER, SHOW_ORDER_SAGA } from '../types/orderTypes'

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

export const addOrder = (order) => {
  return {
    type: ADD_ORDER,
    payload: order,
  }
}

export const addOrderSaga = (order) => {
  return {
    type: ADD_ORDER_SAGA,
    payload: order,
  };
};
