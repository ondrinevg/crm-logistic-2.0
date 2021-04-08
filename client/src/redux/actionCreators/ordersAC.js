import { SHOW_ALL_ORDERS, SHOW_ALL_ORDERS_SAGA } from '../types/ordersTypes'

export const showAllOrders = (orders) => {
  return {
    type: SHOW_ALL_ORDERS,
    payload: orders
  }
}

export const showAllOrdersSaga = () => ({ type: SHOW_ALL_ORDERS_SAGA });
