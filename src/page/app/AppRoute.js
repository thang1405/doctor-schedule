import React from 'react'

import {Switch,Route} from 'react-router-dom';

import Doctor from './Doctor'
import DoctorDetail from './DoctorDetail'
import Home from './Home'

function appRoute(props) {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/doctor" exact component={Doctor} />
        <Route path="/doctor/:id" exact component={DoctorDetail} />
      </Switch>
    </div>
  )
}

export default appRoute
