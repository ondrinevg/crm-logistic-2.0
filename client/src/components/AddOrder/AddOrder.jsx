import React, { useRef } from 'react'

export default function AddOrder() {
  const formRef = useRef(null);


  const submitHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(new FormData(formRef.current).entries());

    if (Object.keys(valuesOfFields).every(key => valuesOfFields[key].trim())) {
      console.log(valuesOfFields);
      formRef.current.reset();
    }
  }

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
            <input placeholder="Фамилия клиента" type="text" name="client" autoComplete="off" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="индекс" type="number" name="index" required className="form-control" />
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

