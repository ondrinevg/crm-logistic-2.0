import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { cleareClientState } from '../../redux/actionCreators/clientAC';
import { searchClientsSaga, showAllClientsSaga } from '../../redux/actionCreators/clientsAC';
import ClientForList from './Client/ClientForList'

export default function ListOfClients() {
  const clients = useSelector(state => state.clients);

  const dispatch = useDispatch();
  const history = useHistory();

  const searchHandler = (e) => {
    dispatch(searchClientsSaga(e.target.value));
  };

  const addClientHandler = () => {
    dispatch(cleareClientState());
    history.push('/clients/new');
  };

  useEffect(() => {
    dispatch(showAllClientsSaga());
  }, []);

  return (
    <div className="container w-5">
      <div className="container d-flex">
        <form name="findClients" className="form-floating align-items-center">
          <div className="row g-3">
            <div className="col-auto">
              <label htmlFor="inputPassword6" className="col-form-label m-4 mx-0">Поиск</label>
            </div>
            <div className="col-auto">
              <input onChange={searchHandler} type="text" name="name" className="search form-control client m-4 mx-2" aria-describedby="passwordHelpInline" />
            </div>
          </div>
        </form>
        <button onClick={addClientHandler} type="button" className="btn btn-light btn-client m-4">Добавить клиента</button>
      </div>

      <ul className="list-group">
        {clients.length > 0
          ? clients.map(client => (
            <ClientForList key={client._id} client={client} />
          ))
          : <div>Нет таких клиентов...</div>
        }
      </ul>
    </div>
  )
}

