import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import TopMenu from './components/TopMenu'
import Home from './page/Home'
import Doctor from './page/Doctor'
import DoctorDetail from './page/DoctorDetail'
import Footer from './components/Footer'
import Login from './page/admin/Login'
import Main from './page/admin/Main'
import Logout from './page/admin/Logout'

function App() {
  return (
    <div>
      <Router>
        <TopMenu />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/doctor" exact component={Doctor} />
          <Route path="/doctor/:id" exact component={DoctorDetail} />
        </Switch>
        <Switch>
          <Route path="/admin" exact component={Login} />
          <Route path="/admin/main" component={Main} />
          <Route path="/admin/logout" component={Logout} />
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App
