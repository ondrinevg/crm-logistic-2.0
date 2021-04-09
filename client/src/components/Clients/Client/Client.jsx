import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteClientSaga } from '../../../redux/actionCreators/clientAC';

export default function Client() {
  const client = useSelector(state => state.client);

  const dispatch = useDispatch();
  const history = useHistory();

  const deleteHandler = () => {
    const result = window.confirm('Точно удалить клиента? Это повлечет удаление всех связанных с ним заказов');
    if (result) {
      dispatch(deleteClientSaga(client._id)); // должны удалить и все связанные заказы
      history.push('/clients');
    }
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-sm">
          <h2>Информация о клиенте</h2>

          <div>
            <Link to={`/clients/${client._id}`} className="firstedit">Редактировать</Link>
            <button onClick={deleteHandler}>Удалить клиента</button>
          </div>

          <div>
            ФИО: {client.lastname} {client.name} {client.middlname}
          </div>

          <div>
            Телефон: {client.phone}
          </div>

          <div>
            E-mail: {client.email}
          </div>

          <div>
            Адрес регистрации: {client.registrationAddress}
          </div>

          <div>
            Адрес проживания: {client.homeAddress}
          </div>

          <h2 className="mt-3">Заказы клиента</h2>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Номер заказа</th>
                <th scope="col">Название</th>
                <th scope="col">Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-success">
                <th><Link to="/orders/:id">number</Link></th>
                <td>contract</td>
                <td>title</td>
                <td>status</td>
              </tr>
            </tbody>
          </table>

          <Link className="btn btn-primary" to="/orders/new/" role="button">Добавить заказ</Link>

        </div>
        <div className="col-sm">
          <h2>Комментарии к клиенту:</h2>

          <ol className="listOfComment">
            <li>
              <div>
                user:
          </div>
            </li>
          </ol>

          <form name="addCommentClient">
            <div className="mb-3">
              <label htmlFor="texOfComment" className="form-label" required={true}>Новый комментарий:</label>
              <textarea name="texOfComment" className="form-control" aria-describedby="emailHelp"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Оставить комментарий</button>
          </form>
        </div>
      </div>
    </div>
  )
}

