import { useDispatch } from 'react-redux';
import {
  IconButton,
  TableCell,
  TableRow,
  Avatar
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import HttpsIcon from '@material-ui/icons/Https';
import { deleteMailSaga } from '../../redux/actionCreators/usersAC';
import { useHistory } from 'react-router';


const Manager = ({ manager }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteMailHandler = () => {
    const result = window.confirm('Заблокировать пользователя?');
    if (result) {
    dispatch(deleteMailSaga(manager._id))
    }
  }

  const editUserHandler = () => {
    history.push(`/user/${manager._id}`)
  }

  return (
    <TableRow className="table-success">
      <TableCell align='center'><Avatar src={manager.photo} /></TableCell>
      <TableCell align='center'>{manager.role}</TableCell>
      <TableCell >{manager.email}</TableCell>
      <TableCell align='center'><IconButton aria-label="delete" onClick={editUserHandler}><EditIcon /></IconButton></TableCell>
      <TableCell align='center'><IconButton color={manager.email ? "primary" : "secondary"} aria-label="delete" onClick={deleteMailHandler}><HttpsIcon /></IconButton></TableCell>
    </TableRow>
  );
}

export default Manager;
