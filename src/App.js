import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Result, Button } from 'antd'

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

import './css/page.css'

const NoMatch = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button>Back Home</Button>
        </Link>
      }
    />
  )
}

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/doctor" exact component={Doctor} />
          <Route path="/specialist/:id" exact component={Specialist} />
          <Route path="/doctor/:id" exact component={DoctorDetail} />
          <Route path="/search" exact component={Searching} />
          <Route path="/admin" exact component={Login} />
          <Route path="/admin/home" exact component={Main} />
          <Route path="/admin/logout" exact component={Logout} />
          <Route path="/admin/manage-doctor" exact component={ManageDoctor} />
          <Route
            path="/admin/manage-doctor/:id" exact
            component={ManageDoctorDetail}
          />
          <Route path="/admin/manage-schedule" component={ManageSchedule} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
