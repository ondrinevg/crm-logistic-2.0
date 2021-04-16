import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentToClientSaga, deleteClientSaga, showClientSaga } from '../../../redux/actionCreators/clientAC';
import { cleareOrderState } from '../../../redux/actionCreators/orderAC';
import { cleareClientsState } from '../../../redux/actionCreators/clientsAC';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListOfComments from '../../ListOfComments/ListOfComments';

const useStyles = makeStyles((theme) => ({
  inWork: {
    backgroundColor: 'rgba(102, 187, 106, .6)',
  },
  finished: {
    backgroundColor: '#9e9e9e',
  },

  claim: {
    backgroundColor: 'rgba(255, 138, 101, .6)',
  },
  edit: {
    color: '#f9a825',
  },
  delete: {
    color: '#c62828',
  },
  userCard: {
    '& > div': {
      marginTop: "20px",
      padding: '0 24px'
    }
  },
  comments: {
    maxWidth: "50px"
  }
}));

export default function ClientMU() {
  const classes = useStyles();
  const { client, loading, user } = useSelector(state => state);
  const { id } = useParams();
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const deleteHandler = () => {
    const result = window.confirm('Точно удалить клиента? Это повлечет удаление всех связанных с ним заказов');
    if (result) {
      dispatch(deleteClientSaga(client._id));
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
      setComment('');
    }
  };

  const addOrderHandler = () => {
    dispatch(cleareOrderState());
    dispatch(cleareClientsState());
    history.push('/order/new');
  };

  useEffect(() => {
    dispatch(showClientSaga(id));
  }, [id]);

  return (
    <Container maxWidth='lg' style={{padding: '20px 0'}}>
      <Grid container spacing={3}>
        <Grid item container xs={6} direction='column' className={classes.userCard}>
          <div>
            <Typography variant='h6'>Информация о клиенте</Typography>
            <Divider style={{ height: '2px', marginTop: '10px' }} />
          </div>
          <ButtonGroup >
            <IconButton className={classes.edit} component={RouterLink} to={`/clients/${client._id}/edit`}>
              <EditIcon />
            </IconButton>
            {user?.role === 'Admin' ? <IconButton className={classes.delete} onClick={deleteHandler}>
              <DeleteIcon />
            </IconButton> : null}
          </ButtonGroup>
          <Box>
            ФИО: {client.lastName} {client.name} {client.middleName}
          </Box>

          <Box>
            Телефон: {client.phone}
          </Box>

          <Box>
            E-mail: {client.email}
          </Box>

          <Box>
            Адрес регистрации: {client.registrationAddress}
          </Box>

          <Box>
            Адрес проживания: {client.homeAddress}
          </Box>

          <Divider style={{ height: '2px', marginTop: '10px' }} />

          <Table>
            <TableHead>
              <TableRow key={client?._id}>
                <TableCell align='center'>№</TableCell>
                <TableCell>Договор</TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Статус</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {client?.orders?.length
                ? client.orders.map(order => (
                  <TableRow key={order._id} className={order.status === 'в работе' ?
                    classes.inWork : order.status === 'завершен' ? classes.finished : classes.claim}>
                    <TableCell align='center'><Button component={RouterLink} to={`/orders/${order._id}`}>{order.number}</Button></TableCell>
                    <TableCell>{order.contractNumber}</TableCell>
                    <TableCell>{order.title}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))
                : null
              }
            </TableBody>
          </Table>
          <Button onClick={addOrderHandler} color="primary">Добавить заказ</Button>
        </Grid>
        <Grid item container xs={6} direction='column' justify='space-between' style={{ minHeight: '700px' }}>

          <Paper elevation={3} style={{ maxHeight: '600px', minHeight: '600px', width: '100%', overflowY: 'scroll', overflowWrap: 'break-word', pagging: '0 24px' }} className={classes.userCard}>
            <ListOfComments comments={client.comments} text={'Комментарии по клиенту'} />
          </Paper>

          <Box style={{position: 'relative'}}>
            {!loading ?
              <form onSubmit={commentHandlerSubmit} name="addCommentClient">
                <FormControl margin='dense' fullWidth={true}>
                  <TextField
                    label="Новый комментарий:"
                    multiline
                    required
                    rows={4}
                    variant="outlined"
                    onChange={commentHandler}
                    value={comment}
                  />
                  <Button type="submit" color="primary">Оставить комментарий</Button>
                </FormControl>
              </form>
              : <CircularProgress style={{position: 'absolute', top: '50%', left: '50%'}}/>}
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

