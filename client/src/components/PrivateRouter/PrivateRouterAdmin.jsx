import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

export default function PrivatRouterAdmin({ component: Component, ...rest }) {
  const currentUser = useSelector(state => state.user);

  return (
    <Route {...rest}>
      {   currentUser?.role === 'Admin' ? <Component /> : <Redirect to='/login' />}
    </Route>
  )
}

