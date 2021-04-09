import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { showOrderSaga, addCommentToOrderSaga, deleteOrderSaga } from '../../../redux/actionCreators/orderAC';

export default function Order() {
  const { id } = useParams();  
  const order = useSelector(state => state.order);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const deleteHandler = () => {
    const result = window.confirm('Точно удалить заказ?');
    if (result) {
      dispatch(deleteOrderSaga(order._id));
      history.push('/orders');
    }
  };

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  const commentHandlerSubmit = (e) => {
    e.preventDefault();

    if (comment.trim()) {
      dispatch(addCommentToOrderSaga(order._id, comment));
      setComment('');
    }
  };

  useEffect(() => {
    dispatch(showOrderSaga(id));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm mt-3">
          <h2>Информация о заказе:</h2>

          <div>
            <Link className="firstedit" to={`/orders/${id}/edit/`}>Редактировать</Link>
            <button onClick={deleteHandler}>Удалить заказ</button>
          </div>

          <div>
            <form name='changeStatus' className="form-floating d-flex">
              <select name='statusSelect' className="form-select edit editStatus" id="floatingSelect" aria-label="Floating label select example">
                <option value="в работе">в работе</option>
                <option value="в рекламации">в рекламации</option>
                <option value="закончен">закончен</option>
              </select>
              <button type="submit" className="btn btn-primary edit">Изменить статус</button>
            </form>
          </div>

          <div id='status'>
            Текущий статус: {order.status}
        </div>
          <div>
            Номер заказа:
        </div>
          <div>
            Название: {order.title}
          </div>
          <div>
            Клиент: <Link to="/clients/:id">ссылка на клиента</Link>
          </div>
          <div>
            Адрес доставки: {order.deliveryAddress}
        </div>
          <div>
            Дата доставки: {new Date(order.deliveryDate).toLocaleDateString()}
        </div>
          <div>
            Дата сборки: {new Date(order.assemblyDate).toLocaleDateString()}
        </div>
          <div>
            Сумма заказа: {order.orderPrice} руб.
        </div>
          <div>
            Оплачено: {order.payment} руб.
        </div>
          <div>
            Стоимость доставки: {order.deliveryPrice} руб.
        </div>
          <div>
            Стоимость сборки: {order.assemblyPrice} руб.
        </div>

        </div>

        <div className="col-sm mt-3">
          <h2>Комментарии к заказу:</h2>

          <ul className="listOfComment">
            {order?.comments?.length
              ? order.comments.map(comment => (
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

