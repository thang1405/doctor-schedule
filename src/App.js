import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Main from './page/admin/Main'
import Logout from './page/admin/Logout'
import Login from './page/admin/Login'
import ManageDoctor from './page/admin/ManageDoctor'
import ManageSchedule from './page/admin//ManageSchedule'
import ManageDoctorDetail from './page/admin/ManageDoctorDetail'
import Doctor from './page/app/Doctor'
import DoctorDetail from './page/app/DoctorDetail'
import Home from './page/app/Home'
import Specialist from './page/app/Specialist'
import Searching from './page/app/Searching'

import NoMatch from './page/NoMatch'

import './css/page.css'


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/doctor" exact component={Doctor} />
          <Route path="/specialist/:id-:specialist" exact component={Specialist} />
          <Route path="/doctor/:id-:doctor" exact component={DoctorDetail} />
          <Route path="/search" exact component={Searching} />
          <Route path="/admin" exact component={Login} />
          <Route path="/admin/home" exact component={Main} />
          <Route path="/admin/logout" exact component={Logout} />
          <Route path="/admin/manage-doctor" exact component={ManageDoctor} />
          <Route
            path="/admin/manage-doctor/:id-:doctor" exact
            component={ManageDoctorDetail}
          />
          <Route path="/admin/manage-schedule" component={ManageSchedule} />
          <Route path={"*"} component={NoMatch} />
          <Route path={"/no-match"} component={NoMatch} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
