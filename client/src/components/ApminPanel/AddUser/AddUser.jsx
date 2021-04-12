import React, { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  Select,
  Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '30ch',
    },
  },
}));

export default function AddUser() {
  const classes = useStyles();
  const formRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    const valuesOfFields = Object.fromEntries(new FormData(formRef.current).entries());

    if (Object.keys(valuesOfFields).every(key => valuesOfFields[key].trim())) {
      fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/users/adminPanel`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(valuesOfFields)
      })
      formRef.current.reset();
    }
  }  

  return (
    <>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={6} container justify='center'>
        <Typography variant="h4" align='center'>Добавление менеджера</Typography>
        <form ref={formRef} onSubmit={submitHandler}>
          <Box p={2} className={classes.root}>
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
          <Box p={6}>
          <FormControl fullWidth={true}>
              <InputLabel htmlFor="age-native-simple">Роль</InputLabel>
              <Select
                native name="role"
              >
                <option aria-label="None" value="" />
                <option value="Manager">Менеджер</option>
                <option value="Admin">Администратор CRM</option>
              </Select>
            </FormControl>
          </Box>
          <Box p={6} className={classes.root}>
            <FormControl>
              <InputLabel htmlFor="component-simple">Телефон</InputLabel>
              <Input type="phone" name="phone" required />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-simple">E-mail (gmail)</InputLabel>
              <Input type="email" name="email" required />
            </FormControl>
          </Box>
          <FormControl fullWidth={true}>
            <Button type="submit">Добавить</Button>
          </FormControl>
        </form>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <div>Лист менеджеров</div>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  )
}

