import React, { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addClientSaga } from '../../redux/actionCreators/clientAC';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '30ch',
    },
  },
}));

export default function AddClientMU() {
  const classes = useStyles();
  const formRef = useRef(null);

  const history = useHistory();

  const dispatch = useDispatch();

  const id = useSelector(state => state.client._id);



  const submitHandler = (e) => {
    e.preventDefault();
    const valuesOfFields = Object.fromEntries(new FormData(formRef.current).entries());

    if (Object.keys(valuesOfFields).every(key => valuesOfFields[key].trim())) {
      dispatch(addClientSaga(valuesOfFields));
      formRef.current.reset();
    }
  }

  useEffect(() => {
    if (id) history.push(`/clients/${id}`);
  }, [id]);

  return (
    <>
      <Container>
      <Typography variant="h4">Добавление клиента</Typography>
        <form ref={formRef} onSubmit={submitHandler}>
          <Box className={classes.root}>
            <FormControl>
              <InputLabel htmlFor="component-simple">Фамилия</InputLabel>
              <Input type="text" name="lastName" required />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-simple">Имя</InputLabel>
              <Input type="text" name="name" required />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-simple">Отчество</InputLabel>
              <Input type="text" name="middleName" required />
            </FormControl>
          </Box>
          <Box className={classes.root}>
            <FormControl>
              <InputLabel htmlFor="component-simple">Телефон</InputLabel>
              <Input type="phone" name="phone" required />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-simple">E-mail</InputLabel>
              <Input type="email" name="email" required />
            </FormControl>
          </Box>
          <Box className={classes.root}>
            <p>Адрес проживания</p>
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
            <p>Адрес регистрации</p>
            <FormControl>
              <InputLabel htmlFor="component-simple">Город</InputLabel>
              <Input type="text" name="cityReg" required />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-simple">Улица</InputLabel>
              <Input type="text" name="streetReg" required />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-simple">Дом/строение</InputLabel>
              <Input type="text" name="buildingReg" required />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-simple">Квартира/помещение</InputLabel>
              <Input type="text" name="roomReg" required />
            </FormControl>
          </Box>
          <FormControl fullWidth={true}>
            <Button type="submit" className="btn btn-primary">Добавить</Button>
          </FormControl>
        </form>
      </Container>
    </>
  )
}

