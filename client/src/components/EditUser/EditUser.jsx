import React, { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { editUserSaga } from '../../redux/actionCreators/usersAC'
import { useDispatch, useSelector } from 'react-redux';
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

export default function EditUser() {
  const { id } = useParams()
  const history = useHistory();

  const classes = useStyles();
  const formRef = useRef(null);

  const user = useSelector(state => state.users.find(el => el._id === id));
  const loading = useSelector(state => state.loading);


  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(new FormData(formRef.current).entries());
    if (Object.keys(valuesOfFields).every(key => valuesOfFields[key].trim())) {
      dispatch(editUserSaga(valuesOfFields, id));
      formRef.current.reset();
      history.push('/admin');
    }
  }

  return (
    <>
      {!loading ?
        <Container>
          <Typography variant="h4">Редактирование пользователя</Typography>
          <form ref={formRef} onSubmit={submitHandler}>
            <Box className={classes.root}>
              <FormControl>
                <InputLabel htmlFor="component-simple">Фамилия</InputLabel>
                <Input type="text" defaultValue={user.lastName} name="lastName" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Имя</InputLabel>
                <Input type="text" defaultValue={user.name} name="name" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">Отчество</InputLabel>
                <Input type="text" defaultValue={user.middleName} name="middleName" required />
              </FormControl>
            </Box>
            <Box className={classes.root}>
              <FormControl>
                <InputLabel htmlFor="component-simple">Телефон</InputLabel>
                <Input type="phone" defaultValue={user.phone} name="phone" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">E-mail</InputLabel>
                <Input type="email" defaultValue={user.email} name="email" required />
              </FormControl>
            </Box>
            <FormControl fullWidth={true}>
              <Button type="submit" className="btn btn-primary">Редактировать</Button>
            </FormControl>
          </form>
        </Container>
        : <CircularProgress />}
    </>
  )
}
