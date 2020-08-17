import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap'

import SearchInput from '../components/SearchInput'

import '../css/Menu.css'

const TopMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <div className="top-menu">
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Trang chủ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/doctor">Bác sĩ</NavLink>
              </NavItem>
            </Nav>
            <Nav>
              <NavItem>
                <SearchInput />
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default TopMenu
