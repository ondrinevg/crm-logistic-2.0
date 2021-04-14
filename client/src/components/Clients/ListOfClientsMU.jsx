import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { cleareClientState } from '../../redux/actionCreators/clientAC';
import { searchClientsSaga, showAllClientsSaga } from '../../redux/actionCreators/clientsAC';
import { Button, CircularProgress, Container, Divider, Grid, List, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ClientForListMU from './Client/ClientForListMU';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    listOfClient: {
      width: '100%',
    }
  },
}));

export default function ListOfClientsMU() {
  const classes = useStyles();
  const clients = useSelector(state => state.clients);
  const loading = useSelector(state => state.loading);

  const dispatch = useDispatch();
  const history = useHistory();

  const searchHandler = (e) => {
    dispatch(searchClientsSaga(e.target.value));
  };

  const addClientHandler = () => {
    dispatch(cleareClientState());
    history.push('/client/new');
  };

  useEffect(() => {
    dispatch(showAllClientsSaga());
  }, []);

  return (
    <>
      {!loading ?
        // <Paper elevation={3}>
          <Container maxWidth="lg" elevation={3} component={Paper}>
            <Typography component="div" style={{ height: '90vh' }}>
              <Grid container alignContent='center' justify='center' spacing={4}>
                <Grid item container xs={6} justify='flex-end' alignContent='center'>
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField onChange={searchHandler} label="Поиск по клиентам" />
                  </form>
                </Grid>
                <Grid item container xs={6} justify='flex-start' alignContent='center'>
                  <Button onClick={addClientHandler}>Добавить клиента</Button>
                </Grid>
                <Grid item container>
                  <Grid container item spacing={4}>
                    <Grid item sm={1}></Grid>
                    <Grid item sm={8}>
                      <Typography variant='h6' align='left'>Клиент</Typography>
                    </Grid>
                    <Grid item sm={2}>
                      <Typography variant='h6' align='center'> Количество заказов</Typography>
                    </Grid>
                    <Grid item sm={1}></Grid>
                  </Grid>
                  <Divider />
                  <List style={{ width: '100%' }}>
                    {clients.length > 0
                      ? clients.map(client => (
                        <ClientForListMU key={client._id} client={client} />
                      ))
                      : <Typography align="center" >Нет таких клиентов...</Typography>
                    }
                  </List>
                </Grid>
              </Grid>
            </Typography>
          </Container>
        // </Paper>
        : <CircularProgress />}
    </>
  )
}

