import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarBrand,
} from 'reactstrap'

import SearchInput from '../components/SearchInput'

import '../css/Menu.css'
import { specialist } from '../util/content'
import { convertString } from '../util/Validator'

const TopMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <div className="top-menu">
      <Navbar
        className="sticky-top"
        color="light"
        id="navbar"
        light
        expand="md"
      >
        <Container>
          <NavbarBrand href="/">NEEL</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/doctor">Bác sĩ</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Chuyên khoa
                </DropdownToggle>
                <DropdownMenu >
                  {specialist.map((item, index) => {
                    return (
                      <DropdownItem key={index} >
                        <NavLink href={`/specialist/${item.key}-${convertString(item.value)}`}>{item.value}</NavLink>
                      </DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
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