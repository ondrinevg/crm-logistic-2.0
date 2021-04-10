import { SEARCH_ORDERS, SEARCH_ORDERS_SAGA, SHOW_ALL_ORDERS, SHOW_ALL_ORDERS_SAGA } from '../types/ordersTypes'

export const showAllOrders = (orders) => {
  return {
    type: SHOW_ALL_ORDERS,
    payload: orders
  }
}

export const showAllOrdersSaga = () => ({ type: SHOW_ALL_ORDERS_SAGA });

export const searchOrders = (orders) => {
  return {
    type: SEARCH_ORDERS,
    payload: orders
  }
}

export const searchOrdersSaga = (text) => {
  return {
    type: SEARCH_ORDERS_SAGA,
    payload: text
  }
}
