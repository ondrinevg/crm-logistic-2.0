import React from 'react'
import { Button, Card, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import back from '../assets/logo.jpg'

const useStyles = makeStyles({
  root: {
    minHeight: 345,
    minWidth: '100vw'
  },
});

export default function LoginPage() {
  const classes = useStyles();
  return (
    <Card image={back} className={classes.root}>
       <Button color="inherit" component={Link} href={`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/auth/google`}>Войти
        </Button>
    </Card>
  )
}
