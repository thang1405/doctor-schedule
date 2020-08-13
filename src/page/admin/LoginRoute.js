import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './Login'

function LoginRoute(props) {
  
  return (
    <Switch>
      <Route path="/admin" exact component={Login} />
    </Switch>
  )
}

export default LoginRoute
