import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showUsersSaga } from '../../redux/actionCreators/usersAC';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Typography
} from '@material-ui/core';
import Manager from '../Manager/Manager';


const ManagerList = () => {
  const users = useSelector(state => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showUsersSaga());
  }, [users]);

  return (
    <>
      <Grid item xs={4} container justify='center'>
        <Typography variant="h6" align='center'>Список пользователей</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ФИО</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.length
              ? users.map(user => (<Manager key={user._id} manager={user} />))
              : null
            }
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={1}></Grid>
    </>

  );
}

export default ManagerList;

