import React, { useEffect, useState, useRef} from 'react';
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
            <UncontrolledDropdown nav Navbar>
              <DropdownToggle nav caret>
                <img src={usr.photo} alt={usr.username} className="UserPhoto" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link className="nav nav-link " title="Iniciar sesión" to="/user_settings"  ><FontAwesomeIcon icon={faCog} /> Ajustes de usuario</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <a href="#" className="nav nav-item CloseSession" title="Cerrar sesión"  onClick={handleLogout} ><FontAwesomeIcon icon={faLockOpen} /></a>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
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
          {userMenu}
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

const mapStateToProps = state => {
  return {      
    user: state.user,
    baseURL: state.baseURL,
  }
}


export default connect(mapStateToProps,null)(NavBar);