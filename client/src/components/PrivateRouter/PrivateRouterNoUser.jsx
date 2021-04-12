import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

export default function PrivateRouterNoUser({ component: Component, ...rest }) {
  const currentUser = useSelector(state => state.user);

  return (
    <Route {...rest}>
      {  !currentUser.role ? <Redirect to='/login' /> : <Component />}
    </Route>
  )
}
