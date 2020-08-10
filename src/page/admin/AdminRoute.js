import React from 'react'

import { Switch, Route } from 'react-router-dom'
import { Container } from 'reactstrap'

import Main from './Main'
import Logout from './Logout'
import Login from './Login'
import ManageDoctor from './ManageDoctor'
import ManageSchedule from './ManageSchedule'
import ManageDoctorDetail from './ManageDoctorDetail';

function adminRoute(props) {
  
  return (
    <Container>
      <Switch>
        <Route path="/admin" exact component={Login} />
        <Route path="/admin/home" component={Main} />
        <Route path="/admin/logout" component={Logout} />
        <Route path="/admin/manage-doctor" exact component={ManageDoctor} />
        <Route path="/admin/manage-doctor/:id" component={ManageDoctorDetail} />
        <Route path="/admin/manage-schedule" component={ManageSchedule} />
      </Switch>
    </Container>
  )
}

export default adminRoute
