import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addCommentToClientSaga, editClientSaga } from '../../redux/actionCreators/clientAC';
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

  const homeAddress = client.homeAddress.split(', ');
  const registrationAddress = client.registrationAddress.split(', ');

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
        <Container>
          <Typography variant="h4">Редактирование клиента</Typography>
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
              <p>Адрес проживания</p>
              <FormControl>
                <InputLabel htmlFor="component-simple">Город</InputLabel>
                <Input type="text" defaultValue={homeAddress[0]} name="city" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Улица</InputLabel>
                <Input type="text" defaultValue={homeAddress[1]} name="street" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Дом/строение</InputLabel>
                <Input type="text" defaultValue={homeAddress[2]} name="building" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Квартира/помещение</InputLabel>
                <Input type="text" defaultValue={homeAddress[3]} name="room" required />
              </FormControl>
            </Box>
            <Box className={classes.root}>
              <p>Адрес регистрации</p>
              <FormControl>
                <InputLabel htmlFor="component-simple">Город</InputLabel>
                <Input type="text" defaultValue={registrationAddress[0]} name="cityReg" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Улица</InputLabel>
                <Input type="text" defaultValue={registrationAddress[1]} name="streetReg" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Дом/строение</InputLabel>
                <Input type="text" defaultValue={registrationAddress[2]} name="buildingReg" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Квартира/помещение</InputLabel>
                <Input type="text" defaultValue={registrationAddress[3]} name="roomReg" required />
              </FormControl>
            </Box>
            <FormControl fullWidth={true}>
              <Button type="submit" className="btn btn-primary">Редактировать</Button>
            </FormControl>
          </form>
        </Container>
        : <CircularProgress style={{position: 'absolute', top: '50%', left: '50%'}}/>}
    </>
  )
}

