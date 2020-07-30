import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TopMenu from './components/TopMenu'
import Home from './page/Home'
import Doctor from './page/Doctor'
import DoctorDetail from './page/DoctorDetail'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Router>
        <div>
          <TopMenu />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/doctor" exact component={Doctor} />
            <Route path="/doctor/:id" exact component={DoctorDetail} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  )
}

export default App
