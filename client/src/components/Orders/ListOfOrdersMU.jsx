import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { cleareClientState } from '../../redux/actionCreators/clientAC';
import { cleareClientsState } from '../../redux/actionCreators/clientsAC';
import { cleareOrderState } from '../../redux/actionCreators/orderAC';
import { searchOrdersSaga, showAllOrdersSaga } from '../../redux/actionCreators/ordersAC';
import { Button, Container, Divider, Grid, List, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import OrderForListMU from './Order/OrderForListMU';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    }, 
  },
}));

export default function ListOfOrdersMU() {
  const classes = useStyles();
  const orders = useSelector(state => state.orders);

  const dispatch = useDispatch();
  const history = useHistory();

  const searchHandler = (e) => {
    dispatch(searchOrdersSaga(e.target.value));
  };

  const addOrderHandler = () => {
    dispatch(cleareOrderState());
    dispatch(cleareClientState());
    dispatch(cleareClientsState());
    history.push('/orders/new');
  };

  useEffect(() => {
    dispatch(showAllOrdersSaga());
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography component="div" style={{ border: '2px solid #cfe8fc', height: '100vh' }}>
        <Grid container alignContent='center' justify='center' spacing={4}>
          <Grid item container xs={6} justify='flex-end' alignContent='center'>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField onChange={searchHandler} label="Поиск по заказам" />
            </form>
          </Grid>
          <Grid item container xs={6} justify='flex-start' alignContent='center'>
            <Button onClick={addOrderHandler}>Добавить заказ</Button>
          </Grid>
          <Grid item container>
            <Grid container item spacing={4}>
              <Grid item sm={1}></Grid>
              <Grid item sm={2}>
                <Typography variant='h6' align='center'>№</Typography>
              </Grid>
              <Grid item sm={2}>
                <Typography variant='h6' align='center'>Договор</Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography variant='h6' align='center'>Название</Typography>
              </Grid>
              <Grid item sm={2}>
                <Typography variant='h6' align='center'>Статус</Typography>
              </Grid>
              <Grid item sm={1}></Grid>
            </Grid>
            <Divider />
            <List style={{ width: '100%' }}>
              {orders.length > 0
                ? orders.map(order => (
                  <OrderForListMU key={order._id} order={order} />
                ))
                : <div>Нет таких заказов...</div>
              }
            </List>
          </Grid>
        </Grid>
      </Typography>
    </Container>
  )
}

