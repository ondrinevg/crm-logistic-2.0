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
  IconButton,
  Typography,
  CircularProgress
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import Manager from '../Manager/Manager';


const ManagerList = () => {
  const users = useSelector(state => state.users);
  const loading = useSelector(state => state.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showUsersSaga());
  }, []);

  return (
    <>
      {!loading ?
        <>
          <Grid item xs={4} container justify='center'>
            <Typography variant="h4" align='center'>Список пользователей</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>
                    <IconButton>
                      <FaceIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align='center'>Статус</TableCell>
                  <TableCell align='center'>Email</TableCell>
                  <TableCell></TableCell>
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
        : <CircularProgress />}
    </>
  );
}

export default ManagerList;


