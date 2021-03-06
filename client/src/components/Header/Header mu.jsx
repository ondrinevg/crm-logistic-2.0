import React from 'react'
import { AppBar, Toolbar, Button, Link, Avatar, Typography, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function HeaderMU() {
  const user = useSelector(state => state.user);
  return (
    <AppBar style={{ backgroundColor: 'rgba(41,49,51,0.80)' }} position="sticky">
      <Toolbar>
        {user?.role === 'Admin' ?
          <Button color="inherit" component={RouterLink} to="/admin">
            Панель администратора
        </Button>
          : null}
        <Button color="inherit" component={RouterLink} to="/">Главная страница
        </Button>
        <Button color="inherit" component={RouterLink} to="/clients">Клиенты
        </Button>
        <Button color="inherit" component={RouterLink} to="/orders">Заказы
        </Button>
        <Box display="flex" justifyContent="flex-end" flexGrow={1}>
          <Button color="inherit" >
            {`${user?.lastName} ${user?.name[0]}. ${user?.middleName[0]}.`}
          </Button>
          <Avatar alt={`${user.name}`} src={user.photo} style={{ marginRight: '40px' }} />
          <Button color="inherit" component={Link} href={`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/auth/logout`}>Выйти
        </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

