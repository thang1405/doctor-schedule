import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

function LeftMenu() {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="admin">
        <Link to='/admin/home'>Admin</Link>
      </Menu.Item>
      <Menu.Item key="doctor">
        <Link to='/admin/manage-doctor'>Quản lý bác sĩ</Link>
      </Menu.Item>
      <Menu.Item key="schedule">
        <Link to='/admin/manage-schedule'>Quản lý đơn hẹn</Link>
      </Menu.Item>
      <Menu.Item key="homePage">
      <Link to="/">Home Page</Link>
      </Menu.Item>
      <Menu.Item key="logout">
      <Link to="/admin/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu
