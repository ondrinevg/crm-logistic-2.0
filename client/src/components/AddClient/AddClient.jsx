import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addClientSaga } from '../../redux/actionCreators/clientAC';

export default function AddClient() {
  const formRef = useRef(null);

  const history = useHistory();

  const dispatch = useDispatch();

  const id = useSelector(state => state.client._id);

 

  const submitHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(new FormData(formRef.current).entries());

    if (Object.keys(valuesOfFields).every(key => valuesOfFields[key].trim())) {
      dispatch(addClientSaga(valuesOfFields));
      formRef.current.reset();
      history.push(`/clients/${id}`);
    }
  }
  return (
    <>
      <div className="container d-flex justify-content-center aling-items-center">
        Добавление клиента
      </div>
      <div className="container-fluid d-flex justify-content-center aling-items-center vh-100 mt-3">
        <form ref={formRef} onSubmit={submitHandler} id="registerForm" action="/clients/new" method="POST">
          <div className="mb-3">
            <input placeholder="Имя" type="text" name="name" required className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input placeholder="Отчество" type="text" name="middlename" required className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input placeholder="Фамилия" type="text" name="lastname" required className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input placeholder="Телефон" type="text" name="phone" required className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input placeholder="Email адрес" type="email" name="email" required className="form-control" aria-describedby="emailHelp" />
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
            <input placeholder="Город" type="text" name="cityReg" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Улица" type="text" name="streetReg" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Дом/строение" type="text" name="buildingReg" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Квартира/помещение" type="text" name="roomReg" required className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Добавить</button>
        </form>
      </div>
    </>
  )
}

