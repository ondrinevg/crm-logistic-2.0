import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showAllOrdersSaga } from '../../redux/actionCreators/ordersAC';
import OrderForList from './Order/OrderForList'

export default function ListOfOrders() {
  const orders = useSelector(state => state.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showAllOrdersSaga());
  }, []);

  return (
    <div className="container">
      <div className="d-flex search m-3">
        <form name="findOrders" className="form-floating align-items-center">
          <div className="row g-3">
            <div className="col-auto">
              <label htmlFor="inputPassword6" className="col-form-label">Поиск</label>
            </div>
            <div className="col-auto">
              <input type="text" name="name" className="form-control" aria-describedby="passwordHelpInline" />
            </div>
          </div>
        </form>

        <Link to="/orders/new"><button type="button" className="btn btn-light btn-client mx-3">Добавить заказ</button></Link>
      </div>

      <div data-type="findOrdersByStatus" className="row m-4">
        <div className="d-flex col-sm">
          <button type="button" className="btn btn-outline-secondary">В работе</button>
        </div>
        <div className="d-flex col-sm">
          <button type="button" className="btn btn-outline-danger">В рекламации</button>
        </div>
        <div className="d-flex col-sm">
          <button type="button" className="btn btn-outline-success">Закрыт</button>
        </div>
      </div>

      <ul className="list-group">
      {orders.length > 0
          ? orders.map(order => (
            <OrderForList key={order._id} order={order}/>
          ))
          : <div>Собираю заказы...</div>
        }
      </ul>
    </div>
  )
}

