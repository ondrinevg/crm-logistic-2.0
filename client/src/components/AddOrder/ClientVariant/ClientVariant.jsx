import React from 'react'
import { useDispatch } from 'react-redux';
import { cleareClientsState } from '../../../redux/actionCreators/clientsAC';
import { addClient } from '../../../redux/actionCreators/clientAC'
import { ListItem } from '@material-ui/core';

export default function ClientVariant({ client, setClientString }) {

  const dispatch = useDispatch();

  const changeStateClientHandler = () => {
    setClientString(`${client.lastName} ${client.name} ${client.middleName}`)
    dispatch(addClient(client));
    dispatch(cleareClientsState());  
  };

  return (
    <ListItem style={{cursor: 'pointer'}} onClick={changeStateClientHandler}>{client.lastName} {client.name} {client.middleName}</ListItem>
  )
}
