import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import moment from 'moment';
import { editOrderSaga } from '../../redux/actionCreators/orderAC';
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  TextField,
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

  const deliveryDate = moment(new Date(order.deliveryDate)).format('YYYY-MM-DD');
  const assemblyDate = moment(new Date(order.assemblyDate)).format('YYYY-MM-DD');

  const [selectedDateDelivery, setSelectedDateDelivery] = useState(deliveryDate);
  const [selectedDateAssembly, setSelectedDateAssembly] = useState(assemblyDate);

  const history = useHistory();

  const dispatch = useDispatch();


  const address = order.deliveryAddress.split(', ');

  const submitHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(new FormData(formRef.current).entries());
    if (Object.keys(valuesOfFields).every(key => valuesOfFields[key].trim())) {
      dispatch(editOrderSaga(valuesOfFields, order._id));
      formRef.current.reset();
      history.push(`/orders/${order._id}`);
    }
  }

  return (
    <>
        <MuiPickersUtilsProvider utils={MomentUtils}>
      <Container>
        <Typography variant="h4">Редактирование заказа</Typography>
        <form ref={formRef} onSubmit={submitHandler}>
          <Box className={classes.root}>
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
            <p>Адрес доставки</p>
            <FormControl>
              <InputLabel htmlFor="component-simple">Город</InputLabel>
              <Input type="text" name="city" defaultValue={address[0]}  required />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-simple">Улица</InputLabel>
              <Input type="text" name="street" defaultValue={address[1]} required />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-simple">Дом/строение</InputLabel>
              <Input type="text" name="building" defaultValue={address[2]} required />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-simple">Квартира/помещение</InputLabel>
              <Input type="text" name="room" defaultValue={address[3]} required />
            </FormControl>
          </Box>
          <Box className={classes.root}>
            <KeyboardDatePicker
              disableToolbar
              name="deliveryDate"
              required
              variant="inline"
              format="YYYY-MM-DD"
              // format="MM/dd/yyyy"
              margin="normal"
              defaultValue={deliveryDate}
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
              defaultValue={assemblyDate}
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
              <Input type="number" defaultValue={order.orderPrice}  name="orderPrice" required />
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
            <Button type="submit" className="btn btn-primary">Добавить</Button>
          </FormControl>
        </form>
      </Container>
    </MuiPickersUtilsProvider>
      {/* <div className="container d-flex justify-content-center aling-items-center">
        Редактирование заказа
      </div>
      <div className="container-fluid d-flex justify-content-center aling-items-center vh-100">
        <form ref={formRef} onSubmit={submitHandler} name="addNewOrderForm">
          <div className="mb-3">
            <input placeholder="Название заказа" defaultValue={order.title} type="text" name="title" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Номер договора" defaultValue={order.contractNumber} type="text" name="contractNumber" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Город" defaultValue={address[0]} type="text" name="city" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Улица" defaultValue={address[1]} type="text" name="street" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Дом/строение" defaultValue={address[2]} type="text" name="building" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Квартира/помещение" defaultValue={address[3]} type="text" name="room" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Дата доставки" defaultValue={deliveryDate} type="date" name="deliveryDate" required className="form-control" />
          </div>        
          <div className="mb-3">
            <input placeholder="Дата сборки" defaultValue={assemblyDate} type="date" name="assemblyDate" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Стоимость заказа" defaultValue={order.orderPrice} type="number" name="orderPrice" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Оплачено" defaultValue={order.payment} type="number" name="payment" className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Стоимость доставки" defaultValue={order.deliveryPrice} type="number" name="deliveryPrice" required className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder="Стоимость сборки" defaultValue={order.assemblyPrice} type="number" name="assemblyPrice" required className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Редактировать</button>
        </form>
      </div> */}
    </>
  )
}
