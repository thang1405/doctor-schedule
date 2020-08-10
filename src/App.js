import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import AdminRoute from './page/admin/AdminRoute'
import AppRoute from './page/app/AppRoute'
import Footer from './components/Footer'
import './css/page.css'

function App() {
  return (
    <div className="page-container">
      <div className='content-wrap  '>
      <Router>
        <AppRoute />
        <AdminRoute />
      </Router>
      </div>
      <Footer className='footer'/>
    </div>
  )
}

export default App
