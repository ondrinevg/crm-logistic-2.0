import React from 'react'
import { AppBar, Toolbar, Button, Link, Avatar, Typography, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function HeaderMU() {
  const user = useSelector(state => state.user);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/admin">
          Панель администратора
        </Button>
        <Button color="inherit" component={RouterLink} to="/">Главная страница
        </Button>
        <Button color="inherit" component={RouterLink} to="/clients">Клиенты
        </Button>
        <Button color="inherit" component={RouterLink} to="/orders">Заказы
        </Button>
        <Box display="flex" justifyContent="flex-end" flexGrow={1}>
          <Button color="inherit">
            {user.googleName}
          </Button>
          <Avatar alt={`${user.name}`} src={user.photo} />
          <Button color="inherit" component={Link} href={`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/auth/logout`}>Выйти
        </Button>
        </Box>
        {/* <Button color="inherit" component={Link} href={`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/auth/google`}>Войти
        </Button> */}
      </Toolbar>
    </AppBar>
  )
}

