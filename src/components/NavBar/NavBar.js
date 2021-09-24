import React, { useEffect, useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import {
  Navbar,
  NavDropdown,
  Dropdown,
  Nav,
  Container,
} from 'react-bootstrap';
import {faLock,faLockOpen, faCog} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { connect,} from 'react-redux';

import avion from '../../assets/img/avion01.png';
import './NavBar.css';
import axios from '../../axios';
import Aux from '../../hoc/Auxiliary';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(<Link className="nav nav-item InitSession" title="Iniciar sesión" to="/login"  ><FontAwesomeIcon icon={faLock} /></Link>);
  

  const toggle = () => setIsOpen(!isOpen);
  const mounted = useRef();

  useEffect(()=>{
      if (localStorage.usuario!==undefined) {
        console.log(props.user)
        const usr = {...props.user, ['photo']:props.baseURL+props.user['photo']}
        setUserMenu(
          <Aux>            
            <Nav   navbar>
            <NavDropdown >
                <Dropdown.Item>
                  <Link className="nav nav-link " title="Iniciar sesión" to="/user_settings"  ><FontAwesomeIcon icon={faCog} /> Ajustes de usuario</Link>
                </Dropdown.Item>
                <Dropdown.Item divider />
                <Dropdown.Item>
                <a href="#" className="nav nav-item CloseSession" title="Cerrar sesión"  onClick={handleLogout} ><FontAwesomeIcon icon={faLockOpen} /></a>
                </Dropdown.Item>
            </NavDropdown>
            </Nav>            
          </Aux>
        );
      }else{
        setUserMenu(<Link className="nav nav-item InitSession" title="Iniciar sesión" to="/login"  ><FontAwesomeIcon icon={faLock} /></Link>);
      } 
  },[props.user])

  const handleLogout = () =>{
    axios
    .post("/auth/logout/")
    .then((res) => {            
            localStorage.clear();
            console.log(localStorage.usuario);
            setUserMenu(<Link className="nav nav-item InitSession" title="Iniciar sesión" to="/login"  ><FontAwesomeIcon icon={faLock} /></Link>);
    })
    .catch(error => {
        console.log(error)
    });
  }

  const SetRightMenu = () =>{
    
      
  
  }

  return (
    <div >
      <Navbar collapseOnSelect bg="light" expand="lg">
        <Container>
          <Navbar.Brand >
            <Link className="navbar navbar-brand" to="/"><img src={avion} height='32px' alt="Logo" /> Brianna Pack</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link >
                <Link className="Link" to="/catalogo">Catálogo</Link>
              </Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <img src={props.user['photo']} alt={props.user['username']} className="UserPhoto" />
                <NavDropdown.Item >
                  <Link className="nav nav-link " title="Iniciar sesión" to="/user_settings"  ><FontAwesomeIcon icon={faCog} /> Ajustes de usuario</Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/*<Navbar color="light" light fixed="top" expand="md" style={{boxShadow:'-1px 1px 2px grey',textDecoration:'none'}} >
        <Navbar.Brand href="#"> <Link className="navbar navbar-brand" to="/"><img src={avion} height='32px' alt="Logo" /> Brianna Pack</Link> </Navbar.Brand>
        <Navbar.Toggle onClick={toggle} />
        <NavBar.Collapse >
          <Nav className="container-fluid" navbar>
            <NavItem>
              <Link className="nav nav-link" to="/catalogo">Catálogo</Link>
            </NavItem>
            <NavItem>
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
            </UncontrolledDropdown>
          </Nav>
        </NavBar.Collapse>
  </Navbar>*/}
    {/*}  <nav style={{textDecoration:"none"}}>
        <ul>
          <li><a href="/"><img src={avion} height='32px' alt="Logo" /> Brianna Pack</a></li>
          <li><a href="/catalogo">Catálogo</a></li>

        </ul>
      </nav>*/}
</div>
  );
}

const mapStateToProps = state => {
  return {      
    user: state.user,
    baseURL: state.baseURL,
  }
}


export default connect(mapStateToProps,null)(NavBar);