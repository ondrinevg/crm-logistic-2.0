import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import moment from 'moment';
import { addCommentToOrderSaga, editOrderSaga } from '../../redux/actionCreators/orderAC';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '30ch',
    },
  },
}));

export default function EditOrderMU() {
  const classes = useStyles();
  const formRef = useRef(null);
  const order = useSelector(state => state.order);
  const loading = useSelector(state => state.loading);

  const deliveryDate = moment(new Date(order.deliveryDate)).format('YYYY-MM-DD');
  const assemblyDate = moment(new Date(order.assemblyDate)).format('YYYY-MM-DD');

  const [selectedDateDelivery, setSelectedDateDelivery] = useState(deliveryDate);
  const [selectedDateAssembly, setSelectedDateAssembly] = useState(assemblyDate);

  const history = useHistory();

  const dispatch = useDispatch();


  const address = order.deliveryAddress?.split(', ');

  const submitHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(new FormData(formRef.current).entries());
    if (Object.keys(valuesOfFields).every(key => valuesOfFields[key].trim())) {
      dispatch(editOrderSaga(valuesOfFields, order._id));
      dispatch(addCommentToOrderSaga(order._id, "заказ был отредактирован"))
      formRef.current.reset();
      history.push(`/orders/${order._id}`);
    }
  }

  return (
    <>
    {!loading ?
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Container elevation={3} component={Paper} style={{ marginTop: '40px', padding: '40px' }}>
          <Typography variant="h4">Редактирование заказа</Typography>
          <Divider style={{ height: '2px', marginTop: '10px', marginBottom: '10px' }} />
          <form ref={formRef} onSubmit={submitHandler}>
            <Box className={classes.root}>
              <FormControl>
                <InputLabel htmlFor="component-simple">Номер заказа</InputLabel>
                <Input type="text" defaultValue={order.number} name="number" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Название заказа</InputLabel>
                <Input type="text" defaultValue={order.title} name="title" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Номер договора</InputLabel>
                <Input type="text" defaultValue={order.contractNumber} name="contractNumber" required />
              </FormControl>

            </Box>

            <Box className={classes.root}>
              <Typography variant='h5'>Адрес доставки</Typography>
              <FormControl>
                <InputLabel htmlFor="component-simple">Город</InputLabel>
                <Input type="text" name="city" defaultValue={address?.length ? address[0] : ''} required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Улица</InputLabel>
                <Input type="text" name="street" defaultValue={address?.length ? address[1] : ''} required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Дом/строение</InputLabel>
                <Input type="text" name="building" defaultValue={address?.length ? address[2] : ''} required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Квартира/помещение</InputLabel>
                <Input type="text" name="room" defaultValue={address?.length ? address[3] : ''} required />
              </FormControl>
            </Box>
            <Box className={classes.root}>
              <KeyboardDatePicker
                disableToolbar
                name="deliveryDate"
                required
                variant="inline"
                format="YYYY-MM-DD"
                margin="normal"
                value={selectedDateDelivery}
                onChange={date => setSelectedDateDelivery(date)}
                label="Дата доставки"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />

              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="YYYY-MM-DD"
                margin="normal"
                name="assemblyDate"
                required
                value={selectedDateAssembly}
                onChange={date => setSelectedDateAssembly(date)}
                label="Дата сборки"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />

            </Box>
            <Box className={classes.root}>
              <FormControl>
                <InputLabel htmlFor="component-simple">Стоимость заказа</InputLabel>
                <Input type="number" defaultValue={order.orderPrice} name="orderPrice" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Оплачено</InputLabel>
                <Input type="number" defaultValue={order.payment} name="payment" required />
              </FormControl>
            </Box>
            <Box className={classes.root}>
              <FormControl>
                <InputLabel htmlFor="component-simple">Стоимость доставки</InputLabel>
                <Input type="number" defaultValue={order.deliveryPrice} name="deliveryPrice" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Стоимость сборки</InputLabel>
                <Input type="number" defaultValue={order.assemblyPrice} name="assemblyPrice" required />
              </FormControl>
            </Box>
            <FormControl fullWidth={true}>
              <Button type="submit" color='primary' size='large'>Отредактировать</Button>
            </FormControl>
          </form>
        </Container>
      </MuiPickersUtilsProvider>
    : <CircularProgress style={{position: 'absolute', top: '50%', left: '50%'}} />}
    </>
  )
}
