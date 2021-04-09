import React from 'react'
import { Link } from 'react-router-dom'

export default function Order() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm mt-3">
          <h2>Информация о заказе:</h2>

          <div>
            <Link className="firstedit" to="/orders/:id/edit/">Редактировать</Link>
            <Link to="/orders/:id/delete/">Удалить заказ</Link>
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
            Текущий статус:
        </div>
          <div>
            Номер заказа:
        </div>
          <div>
            Название:
          </div>
          <div>
            Клиент: <Link to="/clients/:id">ссылка на клиента</Link>
          </div>
          <div>
            Адрес доставки:
        </div>
          <div>
            Дата доставки:
        </div>
          <div>
            Дата сборки:
        </div>
          <div>
            Сумма заказа:
        </div>
          <div>
            Оплачено:
        </div>
          <div>
            Стоимость доставки:
        </div>
          <div>
            Стоимость сборки:
        </div>

        </div>

        <div className="col-sm mt-3">
          <h2>Комментарии к заказу:</h2>

          <ol className="listOfComment">
            <li>
              <div>
                user: comment
            </div>
            </li>
          </ol>
          <form name="addCommentOrder">
            <div className="mb-3">
              <label htmlFor="texOfComment" className="form-label">Новый комментарий:</label>
              <textarea name="texOfComment" className="form-control" aria-describedby="emailHelp" required={true}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Оставить комментарий</button>
          </form>
        </div>
      </div>
    </div>
  )
}
