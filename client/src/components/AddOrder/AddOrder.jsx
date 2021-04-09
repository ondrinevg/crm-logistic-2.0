import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addOrderSaga, findClientsForOrderSaga } from '../../redux/actionCreators/orderAC';

export default function AddOrder() {
  const formRef = useRef(null);

  const history = useHistory();

  const dispatch = useDispatch();

  const client = useSelector(state => state.client);
  const id = useSelector(state => state.order._id);
  const clients = useSelector(state => state.clients);

  const submitHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(new FormData(formRef.current).entries());
    const order = {...valuesOfFields, client: client._id}
    if (Object.keys(order).every(key => order[key].trim())) {
      dispatch(addOrderSaga(order));
      formRef.current.reset(); 
    }
  }

  const handlerSerchClients = (e) => {
    const text = e.target.value;
    dispatch(findClientsForOrderSaga(text));
  }

  useEffect(() => {
    if (id) history.push(`/orders/${id}`);
  }, [id]);

  return (
    <>
      <div className="container d-flex justify-content-center aling-items-center">
        Добавление заказа
      </div>
      <div className="container-fluid d-flex justify-content-center aling-items-center vh-100">
        <form ref={formRef} onSubmit={submitHandler} name="addNewOrderForm">
          <div className="mb-3">
            <input placeholder="Название заказа" type="text" name="title" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Номер договора" type="text" name="contractNumber" required className="form-control" />
          </div>          
          <div className="mb-3">
            <input
            onChange={(e) => handlerSerchClients(e)}
            placeholder="Клиент"
            defaultValue={client?.id ? `${client.lastName} ${client.name} ${client.middleName}` : ''}
            type="text"
            name="client"
            autoComplete="off"
            required
            className="form-control" />
          </div>
          <div>
            { clients.length ? clients.map(el => (<p key={el._id}>{el.lastName} {el.name} {el.middleName}</p>)) : '' }
          </div>
          <div className="mb-3">
            <input placeholder="Город" type="text" name="city" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Улица" type="text" name="street" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Дом/строение" type="text" name="building" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Квартира/помещение" type="text" name="room" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Дата доставки" type="date" name="deliveryDate" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Дата сборки" type="date" name="assemblyDate" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Стоимость заказа" type="number" name="orderPrice" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Оплачено" type="number" name="payment" className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Стоимость доставки" type="number" name="deliveryPrice" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Стоимость сборки" type="number" name="assemblyPrice" required className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Добавить</button>
        </form>
      </div>
    </>
  )
}

