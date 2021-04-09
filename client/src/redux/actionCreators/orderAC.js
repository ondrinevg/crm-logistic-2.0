import { ADD_COMMENT_ORDER, ADD_COMMENT_ORDER_SAGA, ADD_ORDER, ADD_ORDER_SAGA, CLEARE_ORDER_STATE, DELETE_ORDER, DELETE_ORDER_SAGA, EDIT_ORDER, EDIT_ORDER_SAGA, SHOW_ORDER, SHOW_ORDER_SAGA } from '../types/orderTypes'

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

export const editOrder = (order) => {
  return {
    type: EDIT_ORDER,
    payload: order,
  };
};

export const editOrderSaga = (order, id) => {
  return {
    type: EDIT_ORDER_SAGA,
    payload: {
      order,
      id,
    }
  };
};

export const deleteOrder = () => {
  return {
    type: DELETE_ORDER,
  };
};

export const deleteOrderSaga = (id) => {
  return {
    type: DELETE_ORDER_SAGA,
    payload: id,
  };
};


export const addCommentToOrder = (order) => {
  return {
    type: ADD_COMMENT_ORDER,
    payload: order,
  };
};


export const addCommentToOrderSaga = (id, text) => {
  return {
    type: ADD_COMMENT_ORDER_SAGA,
    payload: {
      text,
      id,
    }
  };
};

export const cleareOrderState = () => {
  return {
    type: CLEARE_ORDER_STATE,
  };
};
