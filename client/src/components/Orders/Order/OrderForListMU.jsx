import React from 'react';
import { Grid, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function OrderForListMU({ order }) {
  return (
    <li>
      <ListItem button component={Link} to={`/orders/${order._id}`}>
        <Grid container spacing={2}>
          <Grid item sm={1}></Grid>
          <Grid item sm={2} align='center'>
            {order.number}
          </Grid>
          <Grid item sm={2} align='center'>
            {order.contractNumber}
          </Grid>
          <Grid item sm={4} align='center'>
            {order.title}
          </Grid>
          <Grid item sm={2} align='center'>
            {order.status}
          </Grid>
          <Grid item sm={1}></Grid>
        </Grid>
      </ListItem>
    </li>
  )
}

