import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addCommentToClientSaga, deleteClientSaga, showClientSaga } from '../../../redux/actionCreators/clientAC';

export default function Client() {
  const client = useSelector(state => state.client);
  const { id } = useParams();
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const deleteHandler = () => {
    const result = window.confirm('Точно удалить клиента? Это повлечет удаление всех связанных с ним заказов');
    if (result) {
      dispatch(deleteClientSaga(client._id)); // должны удалить и все связанные заказы
      history.push('/clients');
    }
  };

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  const commentHandlerSubmit = (e) => {
    e.preventDefault();

    if (comment.trim()) {
      dispatch(addCommentToClientSaga(client._id, comment));
    }
  };

  useEffect(() => {
    dispatch(showClientSaga(id));
  }, [id]);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-sm">
          <h2>Информация о клиенте</h2>

          <div>
            <Link to={`/clients/${client._id}/edit`} className="firstedit">Редактировать</Link>
            <button onClick={deleteHandler}>Удалить клиента</button>
          </div>

          <div>
            ФИО: {client.lastName} {client.name} {client.middleName}
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

          <ul className="listOfComment">
            {client?.comments?.length
              ? client.comments.map(comment => (
                <li key={comment._id}>user {new Date(comment.createdAt).toLocaleString()}: {comment.text}</li>
              ))
              : null
            }            
          </ul>

          <form onSubmit={commentHandlerSubmit} name="addCommentClient">
            <div className="mb-3">
              <label htmlFor="texOfComment" className="form-label">Новый комментарий:</label>
              <textarea onChange={commentHandler} value={comment} name="texOfComment" className="form-control" required={true} aria-describedby="emailHelp"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Оставить комментарий</button>
          </form>
        </div>
      </div>
    </div>
  )
}

