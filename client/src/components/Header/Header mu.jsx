import React from 'react'
import { AppBar, Toolbar, Button, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

export default function HeaderMU() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/users/adminPanel">
          Панель администратора
        </Button>
        <Button color="inherit" component={RouterLink} to="/">Главная страница
        </Button>
        <Button color="inherit" component={RouterLink} to="/clients">Клиенты
        </Button>
        <Button color="inherit" component={RouterLink} to="/orders">Заказы
        </Button>
        <Button color="inherit" component={RouterLink} to="/users/logout">Выйти
        </Button>
        <Button color="inherit" component={Link} href={`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/auth/google`}>Войти
        </Button>
      </Toolbar>
    </AppBar>
  )
}

