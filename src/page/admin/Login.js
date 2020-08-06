import React, { useState } from 'react'
import { Container } from 'reactstrap'
import { Form, Input, Button } from 'antd'
import { Redirect } from 'react-router-dom'

import { loginAdmin } from '../../service/AdminService'

function Login() {
  const token = localStorage.getItem('token')

  let loggedIn = true
  if (token == null) {
    loggedIn = false
  }

  const [login, setLogin] = useState({
    loggedIn,
  })

  const onFinish = (values) => {
    console.log(values)
    loginAdmin(values)
      .then((res) => {
        const token = res.data.access_token
        localStorage.setItem('token', token )
        setLogin((prev) => {
          return { ...prev, loggedIn: true }
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  if (login.loggedIn) {
    return <Redirect to="/admin/main" />
  }

  return (
    <Container>
      <h1>Admin Login</h1>
      <p>username neel@email.com </p>
      <p>password neel </p>
      <Form
        {...layout}
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  )
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
}
const tailLayout = {
  wrapperCol: { offset: 6, span: 12 },
}

export default Login
