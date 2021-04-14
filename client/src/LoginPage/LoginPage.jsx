import React from 'react'
import { Button, Card, CardActions, Container, Link, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import back from '../assets/logo.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${back})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '700px',
    minWidth: '100%',
    marginTop: '40px',
    padding: theme.spacing(4),
    paddingBottom: '80px',
  },
  controls: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  return (
    <Container>
      <Card component={Paper} elevation={5} className={classes.root}>
        <CardActions className={classes.controls}>
          <Button size="large" variant="contained" color="secondary" component={Link} href={`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/auth/google`}>Войти
        </Button>
        </CardActions>
      </Card>
    </Container>
  )
}
