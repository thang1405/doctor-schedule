import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import SearchInput from '../components/SearchInput'

const TopMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar color="dark" dark expand="md">
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
              <SearchInput placeholder="Nhập tên bác sĩ" />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default TopMenu
