import React from 'react'

import TopMenu from '../../components/TopMenu'
import Footer from '../../components/Footer'
import '../../css/page.css'
function HomeLayout(props) {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <TopMenu className="top-menu" />
        <div className="main">{props.children}</div>
        <Footer className="footer" />
      </div>
    </div>
  )
}

export default HomeLayout
