import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'

import LeftMenu from '../../components/LeftMenu'
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
    <div>
      <LeftMenu />
      <Container>
        <h2>Chào admin , đây là giao diện admin tạm thời</h2>
      </Container>
    </div>
  )
}

export default Main
