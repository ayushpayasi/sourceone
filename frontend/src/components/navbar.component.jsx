import React,{useState} from "react"
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink} from 'reactstrap';

  const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">BookStore</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/aboutme">About Me</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.github.com/ayushpayasi/sourceone">GitHub</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.github.com/ayushpayasi/sourceone">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  
  export default NavBar;