import { useDispatch } from 'react-redux';
import {
  IconButton,
  TableCell,
  TableRow,
  Avatar
} from '@material-ui/core';
import HttpsIcon from '@material-ui/icons/Https';
import { deleteMailSaga } from '../../redux/actionCreators/usersAC';

const Manager = ({ manager }) => {
  const dispatch = useDispatch();

  const deleteMailHandler = () => {
    dispatch(deleteMailSaga(manager._id))
  }
  
  return (
    <TableRow className="table-success">
      <TableCell><Avatar alt={`${manager.lastName} ${manager.name} ${manager.middleName}`} src={manager.photo} /></TableCell>
      <TableCell>{manager.role}</TableCell>
      <TableCell>{manager.email}</TableCell>
      <TableCell align='center'><IconButton color={manager.email ? "secondary" : "primary"} aria-label="delete" onClick={deleteMailHandler}><HttpsIcon /></IconButton></TableCell>
    </TableRow>
  );
}

export default Manager;
