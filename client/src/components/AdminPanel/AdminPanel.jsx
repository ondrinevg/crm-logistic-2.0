import React from 'react'
import ManagerList from '../ManagerList/ManagerList'
import AddUser from './AddUser/AddUser'
import {
  Grid,
} from '@material-ui/core';

export default function AdminPanel() {
  return (
    <div>
      <Grid container>
        <AddUser />
        <ManagerList />
      </Grid>
    </div>
  )
}

