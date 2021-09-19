import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from 'reactstrap';
import {faLock,faLockOpen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import avion from '../../assets/img/avion01.png';
import './NavBar.css';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div >
      <Navbar color="light" light fixed="top" expand="md" style={{boxShadow:'-1px 1px 2px grey',textDecoration:'none'}} >
         <Link className="navbar navbar-brand" to="/"><img src={avion} height='32px' alt="Logo" /> Brianna Pack</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="container-fluid" navbar>
            <NavItem>
              <Link className="nav nav-link" to="/catalogo">Catálogo</Link>
            </NavItem>
            {/*<NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>*/}
          </Nav>
            
        </Collapse>
  </Navbar>
    {/*}  <nav style={{textDecoration:"none"}}>
        <ul>
          <li><a href="/"><img src={avion} height='32px' alt="Logo" /> Brianna Pack</a></li>
          <li><a href="/catalogo">Catálogo</a></li>

        </ul>
      </nav>*/}
</div>
  );
}

export default NavBar;