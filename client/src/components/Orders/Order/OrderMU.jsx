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
  Typography
} from '@material-ui/core';
import SnoozeIcon from "@material-ui/icons/Snooze";
import AlarmIcon from "@material-ui/icons/AddAlarm";
import { IconButton, InputAdornment } from "@material-ui/core";
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';

moment.locale('ru');

export default function OrderMU() {
  const { id } = useParams();
  const order = useSelector(state => state.order);
  const loading = useSelector(state => state.loading);

  const [clearedDate, handleClearedDateChange] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedEndDate, handleEndDateChange] = useState(new Date());
  console.log(selectedDate);
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

  useEffect(() => {
    dispatch(showOrderSaga(id));
  }, []);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item container xs={6} direction='column'>
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
                  <option value="закончен">закончен</option>
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

            <Grid item container>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <form name="addEvent">
                  <FormControl margin='normal' fullWidth={true}>
                    <DateTimePicker
                      autoOk
                      hideTabs
                      ampm={false}
                      value={selectedDate}
                      onChange={handleDateChange}
                      allowKeyboardControl={false}
                      minDate={new Date()}
                      helperText="Дата начала нового события"
                      leftArrowIcon={<AlarmIcon />}
                      leftArrowButtonProps={{ "aria-label": "Prev month" }}
                      rightArrowButtonProps={{ "aria-label": "Next month" }}
                      rightArrowIcon={<SnoozeIcon />}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <AlarmIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  <FormControl margin='normal' fullWidth={true}>
                    <DateTimePicker
                      autoOk
                      hideTabs
                      ampm={false}
                      value={selectedEndDate}
                      onChange={handleEndDateChange}
                      allowKeyboardControl={false}
                      minDate={new Date()}
                      helperText="Дата окончания нового события"
                      leftArrowIcon={<AlarmIcon />}
                      leftArrowButtonProps={{ "aria-label": "Prev month" }}
                      rightArrowButtonProps={{ "aria-label": "Next month" }}
                      rightArrowIcon={<SnoozeIcon />}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <AlarmIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  <FormControl margin='normal' fullWidth={true}>
                    <InputLabel htmlFor="age-native-simple">Вид собыия</InputLabel>
                    <Select
                      native
                    // onChange={} value={}
                    >
                      <option aria-label="None" value="" />
                      <option value="доставка">доставка</option>
                      <option value="сборка">сборка</option>
                    </Select>
                  </FormControl>
                  <FormControl margin='normal'  fullWidth={true}>
                    <TextField
                      label="Дополнительные сведения:"
                      multiline
                      required
                      rows={4}
                      variant="outlined"
                      // onChange={}
                      // value={}
                    />
                     </FormControl>
                </form>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>


          </Grid>
          <Grid item container xs={6} direction='column' justify='space-between' style={{ minHeight: '700px' }}>
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

