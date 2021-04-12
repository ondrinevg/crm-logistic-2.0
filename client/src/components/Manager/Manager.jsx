import { useDispatch } from 'react-redux';
import {
  Button,
  TableCell,
  TableRow,
} from '@material-ui/core';

const Manager = ({ manager }) => { 
  const dispatch = useDispatch();

  const deleteMailHandler = () => {
    dispatch(deleteMailSaga(manager._id)) //action по id удалить почту
  }
console.log(manager);
  return (
    <TableRow className="table-success">
      <TableCell>{manager.lastName} {manager.name} {manager.middleName}</TableCell>
      <TableCell>{manager.role}</TableCell>
      <TableCell>{manager.email}</TableCell>
      <TableCell align='center'><Button onClick={deleteMailHandler}>Блок</Button></TableCell>
    </TableRow>
  );
}

export default Manager;