import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

export default function PrivatRouter({ component: Component, ...rest }) {
  const currentUser = useSelector(state => state.user);

  return (
    <Route {...rest}>
      {   currentUser?.name ? <Component /> : <Redirect to='/orders' />}
    </Route>
  )
}

