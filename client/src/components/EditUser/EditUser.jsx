import React, { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { editUserSaga } from '../../redux/actionCreators/usersAC'
import { useDispatch, useSelector } from 'react-redux';
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
  Select,
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
        <Container elevation={3} component={Paper} style={{ marginTop: '40px', padding: '40px' }}>
          <Typography variant="h4">Редактирование пользователя</Typography>
          <Divider style={{ height: '2px', marginTop: '10px', marginBottom: '10px' }} />
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
            <Box p={6}>
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="age-native-simple">Роль</InputLabel>
                <Select
                  native name="role"
                  required
                  defaultValue={user.role}
                >
                  <option value="Manager">Менеджер</option>
                  <option value="Admin">Администратор CRM</option>
                </Select>
              </FormControl>
            </Box>
            <Box className={classes.root}>
              <FormControl>
                <InputLabel htmlFor="component-simple">Телефон</InputLabel>
                <Input type="number" defaultValue={user.phone} name="phone" required />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="component-simple">E-mail</InputLabel>
                <Input type="email" defaultValue={user.email} name="email" required />
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
