import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addOrderSaga, findClientsForOrderSaga } from '../../redux/actionCreators/orderAC';
import ClientVariant from './ClientVariant/ClientVariant';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  Typography
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import { addCommentToClientSaga } from '../../redux/actionCreators/clientAC';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '30ch',
    },
  },
}));

export default function AddOrderMU() {
  const classes = useStyles();
  const formRef = useRef(null);
  const [clientString, setClientString] = useState('');

  const [selectedDateDelivery, setSelectedDateDelivery] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [selectedDateAssembly, setSelectedDateAssembly] = useState(moment(new Date()).format('YYYY-MM-DD'));

  const history = useHistory();

  const dispatch = useDispatch();

  const client = useSelector(state => state.client);
  const id = useSelector(state => state.order._id);
  const clients = useSelector(state => state.clients);
  const loading = useSelector(state => state.loading);

  const clientStringHandler = (e) => {
    setClientString(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(new FormData(formRef.current).entries());
    const order = { ...valuesOfFields, client: client._id }
    if (Object.keys(order).every(key => order[key].trim())) {
      dispatch(addOrderSaga(order));
      dispatch(addCommentToClientSaga(client._id, `добавлен заказ №${valuesOfFields.number}`))
      formRef.current.reset();
    }
  }

  const handlerSerchClients = (e) => {
    const text = e.target.value;
    dispatch(findClientsForOrderSaga(text));
  }

  useEffect(() => {
    if (id) history.push(`/orders/${id}`);
  }, [id]);

  return (
    <>
      {!loading ?
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Container>
            <Typography variant="h4">Добавление заказа</Typography>
            <form ref={formRef} onSubmit={submitHandler}>
              <Box className={classes.root}>
                <FormControl>
                  <InputLabel htmlFor="component-simple">Номер заказа</InputLabel>
                  <Input type="text" name="number" required />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="component-simple">Название заказа</InputLabel>
                  <Input type="text" name="title" required />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="component-simple">Номер договора</InputLabel>
                  <Input type="text" name="contractNumber" required />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="component-simple">Клиент</InputLabel>
                  <Input
                    onChange={(e) => {
                      clientStringHandler(e);
                      handlerSerchClients(e);
                    }
                    }
                    value={client?._id ? `${client.lastName} ${client.name} ${client.middleName}` : clientString}
                    type="text"
                    name="client"
                    autoComplete="off"
                    required />
                </FormControl>
                <ul>
                  {clients.length
                    ? clients.map(client => (
                      <ClientVariant key={client._id} client={client} setClientString={setClientString} />
                    ))
                    :
                    ''
                  }
                </ul>
              </Box>

              <Box className={classes.root}>
                <p>Адрес доставки</p>
                <FormControl>
                  <InputLabel htmlFor="component-simple">Город</InputLabel>
                  <Input type="text" name="city" required />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="component-simple">Улица</InputLabel>
                  <Input type="text" name="street" required />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="component-simple">Дом/строение</InputLabel>
                  <Input type="text" name="building" required />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="component-simple">Квартира/помещение</InputLabel>
                  <Input type="text" name="room" required />
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
                  minDate={new Date()}
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
                  minDate={new Date()}
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
                  <Input type="number" name="orderPrice" required />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="component-simple">Оплачено</InputLabel>
                  <Input type="number" name="payment" required />
                </FormControl>
              </Box>
              <Box className={classes.root}>
                <FormControl>
                  <InputLabel htmlFor="component-simple">Стоимость доставки</InputLabel>
                  <Input type="number" name="deliveryPrice" required />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="component-simple">Стоимость сборки</InputLabel>
                  <Input type="number" name="assemblyPrice" required />
                </FormControl>
              </Box>
              <FormControl fullWidth={true}>
                <Button type="submit" className="btn btn-primary">Добавить</Button>
              </FormControl>
            </form>
          </Container>
        </MuiPickersUtilsProvider>
        : <CircularProgress />}
    </>
  )
}

