import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const TopMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">NEEL</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Trang chủ</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/doctor/">Bác sĩ</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Doctor Schedule</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default TopMenu;