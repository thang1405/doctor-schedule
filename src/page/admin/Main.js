import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import {Container} from 'reactstrap';

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
    <Container>
      <h2>hi !! admin</h2>
      <Link to="/admin/logout">Logout</Link>
    </Container>
  )
}

export default Main
