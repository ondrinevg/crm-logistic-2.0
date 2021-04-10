import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { editClientSaga } from '../../redux/actionCreators/clientAC';

export default function EditClient() {
  const formRef = useRef(null);

  const history = useHistory();

  const dispatch = useDispatch();

  const client = useSelector(state => state.client);

  const homeAddress = client.homeAddress.split(', ');
  const registrationAddress = client.registrationAddress.split(', ');

  const submitHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(new FormData(formRef.current).entries());
    if (Object.keys(valuesOfFields).every(key => valuesOfFields[key].trim())) {
      dispatch(editClientSaga(valuesOfFields, client._id));
      formRef.current.reset();
      history.push(`/clients/${client._id}`);
    }
  }

  return (
    <>
      <div className="container d-flex justify-content-center aling-items-center">
        Редактирование клиента
      </div>
      <div className="container-fluid d-flex justify-content-center aling-items-center vh-100 mt-3">
        <form ref={formRef} onSubmit={submitHandler}>
          <div className="mb-3">
            <input placeholder="Имя" defaultValue={client.name} type="text" name="name" required className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input placeholder="Отчество" defaultValue={client.middleName} type="text" name="middleName" required className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input placeholder="Фамилия" type="text" defaultValue={client.lastName} name="lastName" required className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input placeholder="Телефон" type="text" defaultValue={client.phone} name="phone" required className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input placeholder="Email адрес" type="email" defaultValue={client.email} name="email" required className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input placeholder="Город" type="text" defaultValue={homeAddress[0]} name="city" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Улица" type="text" defaultValue={homeAddress[1]} name="street" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Дом/строение" type="text" defaultValue={homeAddress[2]} name="building" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Квартира/помещение" defaultValue={homeAddress[3]} type="text" name="room" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Город" defaultValue={registrationAddress[0]} type="text" name="cityReg" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Улица" defaultValue={registrationAddress[1]} type="text" name="streetReg" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Дом/строение" defaultValue={registrationAddress[2]} type="text" name="buildingReg" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Квартира/помещение" defaultValue={registrationAddress[3]} type="text" name="roomReg" required className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Редактировать</button>
        </form>
      </div>
    </>
  )
}

