import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
  NavbarBrand
} from 'reactstrap'

import SearchInput from '../components/SearchInput'

import '../css/Menu.css'

const TopMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <div className="top-menu">
      <Navbar className='sticky-top' color="light" id="navbar" light expand="md">
        <Container>
        <NavbarBrand href="/">NEEL</NavbarBrand>
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
