import React from 'react'
import { Redirect,Link} from 'react-router-dom'
import { Container } from 'reactstrap'
import { Result, Button } from 'antd';
import { Html5Outlined } from '@ant-design/icons';

import AdminLayout from './AdminLayout'
function Main(props) {
  const token = localStorage.getItem('token')

  let isLoggedIn = true
  if (token == null) {
    isLoggedIn = false
  }

  if (!isLoggedIn) {
    return <Redirect to="/admin" />
  }
  return (
    <AdminLayout>
      <Container>
        <Result
          icon={<Html5Outlined />}
          title="Xin chào , Đây là trang admin!"
          extra={<Link to='/admin/manage-doctor'><Button type="primary">Quản lý bác sĩ</Button></Link>}
        />
      </Container>
    </AdminLayout>
  )
}

export default Main
