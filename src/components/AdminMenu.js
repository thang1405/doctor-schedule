import React from 'react'
import { Menu } from 'antd'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../css/Menu.css'

function AdminMenu() {
  return (
    <div className="top-menu">
      <Container>
        <Menu mode="horizontal">
          <Menu.Item key="admin">
            <Link to="/admin/home">Admin</Link>
          </Menu.Item>
          <Menu.Item key="doctor">
            <Link to="/admin/manage-doctor">Quản lý bác sĩ</Link>
          </Menu.Item>
          <Menu.Item key="schedule">
            <Link to="/admin/manage-schedule">Quản lý đơn hẹn</Link>
          </Menu.Item>
          <Menu.Item key="homePage"z>
            <Link to="/">Home Page</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Link to="/admin/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Container>
    </div>
  )
}

export default AdminMenu
