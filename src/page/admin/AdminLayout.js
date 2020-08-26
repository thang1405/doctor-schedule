import React from 'react'

import AdminMenu from '../../components/AdminMenu'
import Footer from '../../components/Footer'
import '../../css/page.css'
function AdminLayout(props) {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <AdminMenu className="top-menu" />
        <div className="main">{props.children}</div>
        <Footer className="footer" />
      </div>
    </div>
  )
}

export default AdminLayout
