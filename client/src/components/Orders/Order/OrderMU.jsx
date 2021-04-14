import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { showOrderSaga, addCommentToOrderSaga, deleteOrderSaga, editOrderSaga } from '../../../redux/actionCreators/orderAC';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Select,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
} from '@material-ui/core';
import Storage from '../../Storage/Storage'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import AddEvent from './AddEvent/AddEvent';

export default function OrderMU() {
  const { id } = useParams();
  const order = useSelector(state => state.order);
  const loading = useSelector(state => state.loading);

  const [comment, setComment] = useState('');
  const [status, setStatus] = useState(order?.status || 'в работе');

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


  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const statusHandlerSubmit = (e) => {
    e.preventDefault();
    const newOrder = { status };
    dispatch(editOrderSaga(newOrder, order._id));
    setStatus('в работе');
  };

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  useEffect(() => {
    dispatch(showOrderSaga(id));
  }, []);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item container xs={5} direction='column'>
            <Typography variant='h6'>Информация о заказе:</Typography>
            <ButtonGroup>
              <Button color="inherit" component={RouterLink} to={`/orders/${id}/edit/`}>Редактировать</Button>
              <Button color="inherit" onClick={deleteHandler}>Удалить заказ</Button>
            </ButtonGroup>
            <form onSubmit={statusHandlerSubmit} name='changeStatus'>
              <FormControl margin='normal' fullWidth={true}>
                <InputLabel htmlFor="age-native-simple">Статус</InputLabel>
                <Select
                  native
                  onChange={statusHandler} value={status}
                >
                  <option aria-label="None" value="" />
                  <option value="в работе">в работе</option>
                  <option value="рекламация">рекламация</option>
                  <option value="завершен">завершен</option>
                </Select>
                <Button type="submit">Изменить статус</Button>
              </FormControl>
            </form>

            <Box>
              Текущий статус: {order.status}
            </Box>

            <Box>
              Номер заказа: {order.number}
            </Box>

            <Box>
              Номер договора: {order.contractNumber}
            </Box>

            <Box>
              Название: {order.title}
            </Box>

            <Box>
              Клиент: <Button component={RouterLink} to={`/clients/${order.client?._id}`}>{order.client?.lastName} {order.client?.name} {order.client?.middleName}</Button>
            </Box>

            <Box>
              Адрес доставки: {order.deliveryAddress}
            </Box>

            <Box>
              Дата доставки: {new Date(order.deliveryDate).toLocaleDateString()}
            </Box>
            <Box>
              Дата сборки: {new Date(order.assemblyDate).toLocaleDateString()}
            </Box>

            <Box>
              Сумма заказа: {order.orderPrice} руб.
          </Box>
            <Box>
              Оплачено: {order.payment} руб.
          </Box>
            <Box>
              Стоимость доставки: {order.deliveryPrice} руб.
          </Box>
            <Box>
              Стоимость сборки: {order.assemblyPrice} руб.
          </Box>
            <Box>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1c-content"
                  id="panel1c-header">
                  <Typography>Установить событие</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <AddEvent order={order.number} />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1c-content"
                  id="panel1c-header">
                  <Typography>Добавить файл</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Storage id={order._id} />

                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1c-content"
                  id="panel1c-header">
                  <Typography>Сохраненные файлы</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {order?.url?.length
                      ? order.url.map((el) => (
                        <ListItem key={el._id} divider >
                          <ListItemIcon>
                            <AttachFileIcon />
                          </ListItemIcon>
                          <ListItemLink href={el.url} >
                            <ListItemText primary={el.fileName} />
                          </ListItemLink>
                        </ListItem>
                      ))
                      : null
                    }
                  </List>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item container xs={6} direction='column' style={{ minHeight: '800px' }}>
            <Paper style={{ minHeight: '600px', overflowY: 'scroll' }}>
              <Typography variant='h6'>Комментарии по заказу</Typography>
              <ul>
                {order?.comments?.length
                  ? order.comments.map(comment => (
                    <li key={comment._id}>{`${comment.manager?.lastName} ${comment.manager?.name[0]}. ${comment.manager?.middleName[0]}.`} {new Date(comment.createdAt).toLocaleString()}: {comment.text}</li>
                  ))
                  : null
                }
              </ul>
            </Paper>
            <>
              {!loading ?
                <form onSubmit={commentHandlerSubmit} name="addCommentClient">
                  <FormControl fullWidth={true}>
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
                : <CircularProgress />}
            </>
          </Grid>
        </Grid>
      </Container>
    </MuiPickersUtilsProvider>
  )
}

