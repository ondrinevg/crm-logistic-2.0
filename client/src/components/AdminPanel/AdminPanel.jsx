import React from 'react'
import ManagerList from '../ManagerList/ManagerList'
import AddUser from './AddUser/AddUser'
import {
  Divider,
  Grid,
} from '@material-ui/core';

export default function AdminPanel() {
  return (
    <div>
      <Grid container style={{marginTop: '40px'}}>
        <AddUser />
       
        <ManagerList />
      </Grid>
    </div>
  )
}

