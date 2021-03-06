import React from 'react'

import { BackTop } from 'antd'
import AdminMenu from '../../components/AdminMenu'
import Footer from '../../components/Footer'
import '../../css/page.css'

const style = {
  height: 60,
  width: 60,
  lineHeight: '60px',
  borderRadius: '50%',
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
  position: 'fixed',
  right: '40px',
  bottom: '90px'
}

function AdminLayout(props) {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <AdminMenu className="top-menu" />
        <BackTop>
          <div style={style}>UP</div>
        </BackTop>
        <div className="main">{props.children}</div>
        <Footer className="footer" />
      </div>
    </div>
  )
}

export default AdminLayout
