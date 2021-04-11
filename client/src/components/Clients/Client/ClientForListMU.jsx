import { Grid, ListItem } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ClientForListMU({ client }) {
  return (
    <li>
      <ListItem button component={Link} to={`/clients/${client._id}`}>
        <Grid container spacing={2}>
          <Grid item sm={1}></Grid>
          <Grid item sm={8}>
            {client.lastName} {client.name} {client.middleName}
          </Grid>
          <Grid item sm={2} align='center'>
            {client.orders.length}
          </Grid>
          <Grid item sm={1}></Grid>
        </Grid>
      </ListItem>
    </li>
  )
}

