import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addCommentToClientSaga, editClientSaga } from '../../redux/actionCreators/clientAC';
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

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '30ch',
    },
  },
}));

export default function EditClientMU() {
  const classes = useStyles();
  const formRef = useRef(null);
  const loading = useSelector(state => state.loading);

  const history = useHistory();

  const dispatch = useDispatch();

  const client = useSelector(state => state.client);

  const homeAddress = client.homeAddress?.split(', ');
  const registrationAddress = client.registrationAddress?.split(', ');

  const submitHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(new FormData(formRef.current).entries());
    if (Object.keys(valuesOfFields).every(key => valuesOfFields[key].trim())) {
      dispatch(editClientSaga(valuesOfFields, client._id));
      dispatch(addCommentToClientSaga(client._id, "страница клиента была отредактирована"))
      formRef.current.reset();
      history.push(`/clients/${client._id}`);
    }
  }

  return (
    <>
      {!loading ?
        <Container elevation={3} component={Paper} style={{ marginTop: '40px', padding: '40px' }}>
          <Typography variant="h4">Редактирование клиента</Typography>
          <Divider style={{ height: '2px', marginTop: '10px', marginBottom: '10px' }} />
          <form ref={formRef} onSubmit={submitHandler}>
            <Box className={classes.root}>
              <FormControl>
                <InputLabel htmlFor="component-simple">Фамилия</InputLabel>
                <Input type="text" defaultValue={client.lastName} name="lastName" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Имя</InputLabel>
                <Input type="text" defaultValue={client.name} name="name" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Отчество</InputLabel>
                <Input type="text" defaultValue={client.middleName} name="middleName" required />
              </FormControl>
            </Box>
            <Box className={classes.root}>
              <FormControl>
                <InputLabel htmlFor="component-simple">Телефон</InputLabel>
                <Input type="phone" defaultValue={client.phone} name="phone" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">E-mail</InputLabel>
                <Input type="email" defaultValue={client.email} name="email" required />
              </FormControl>
            </Box>
            <Box className={classes.root}>
              <Typography variant='h5'>Адрес проживания</Typography>
              <FormControl>
                <InputLabel htmlFor="component-simple">Город</InputLabel>
                <Input type="text" defaultValue={homeAddress?.length ? homeAddress[0] : ''} name="city" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Улица</InputLabel>
                <Input type="text" defaultValue={homeAddress?.length ? homeAddress[1] : ''} name="street" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Дом/строение</InputLabel>
                <Input type="text" defaultValue={homeAddress?.length ? homeAddress[2] : ''} name="building" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Квартира/помещение</InputLabel>
                <Input type="text" defaultValue={homeAddress?.length ? homeAddress[3] : ''} name="room" required />
              </FormControl>
            </Box>
            <Box className={classes.root}>
              <Typography variant='h5'>Адрес регистрации</Typography>
              <FormControl>
                <InputLabel htmlFor="component-simple">Город</InputLabel>
                <Input type="text" defaultValue={registrationAddress?.length ? registrationAddress[0] : ''} name="cityReg" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Улица</InputLabel>
                <Input type="text" defaultValue={registrationAddress?.length ? registrationAddress[1] : ''} name="streetReg" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Дом/строение</InputLabel>
                <Input type="text" defaultValue={registrationAddress?.length ? registrationAddress[2] : ''} name="buildingReg" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Квартира/помещение</InputLabel>
                <Input type="text" defaultValue={registrationAddress?.length ? registrationAddress[3] : ''} name="roomReg" required />
              </FormControl>
            </Box>
            <FormControl fullWidth={true}>
              <Button type="submit" color='primary' size='large'>Редактировать</Button>
            </FormControl>
          </form>
        </Container>
        : <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />}
    </>
  )
}

