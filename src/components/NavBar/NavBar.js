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
  const [adminMenu,setAdminMenu] = useState(null);
  

  const toggle = () => setIsOpen(!isOpen);
  const mounted = useRef();

  useEffect(()=>{
      if (localStorage.usuario!==undefined) {
        console.log(props.user)
        const usr = {...props.user, ['photo']:props.baseURL+props.user['photo']}

        if (props.user.is_staff){
          setAdminMenu(
            <Aux> 
              <NavDropdown title="Administración" id="basic-nav-dropdown">
                <NavDropdown.Item >
                  <Link className="nav nav-link " title="Editar Unidades de medida" to="/edit_um"  > Edición de Unidades de medida</Link>
                  <Link className="nav nav-link " title="Editar Departamentos" to="/edit_departments"  > Edición de departamentos</Link>
                  <Link className="nav nav-link " title="Editar productos" to="/edit_products"  > Edición de productos</Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Aux>
          )
        }


        setUserMenu(
          <Aux> 
            <NavDropdown title={props.user['username']} id="basic-nav-dropdown">
              
              <NavDropdown.Item >
                <Link className="nav nav-link " title="Iniciar sesión" to="/user_settings"  ><FontAwesomeIcon icon={faCog} /> Ajustes de usuario</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
                <a href="#" className="nav nav-item" title="Cerrar sesión"  onClick={handleLogout} ><span className="CloseSession"><FontAwesomeIcon icon={faLockOpen} /></span> Cerrar sesión</a>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
              <img src={usr['photo']} alt={props.user['username']} className="UserPhoto" />
            </Nav.Item>                       
          </Aux>
        );
      }else{
        setUserMenu(<Nav.Item >
            <Link className="nav nav-item InitSession" title="Iniciar sesión" to="/login"  ><FontAwesomeIcon icon={faLock} /></Link>
          </Nav.Item>);
      } 
  },[props.user])

  const handleLogout = () =>{
    axios
    .post("/auth/logout/")
    .then((res) => {            
            localStorage.clear();
            console.log(localStorage.usuario);
            setUserMenu(<NavDropdown.Item >
                <Link className="nav nav-item InitSession" title="Iniciar sesión" to="/login"  ><FontAwesomeIcon icon={faLock} /></Link>
              </NavDropdown.Item>);
    })
    .catch(error => {
        console.log(error)
    });
  }

  const SetRightMenu = () =>{  
      
  
  }

  return (
    <div >
      <Navbar collapseOnSelect bg="light" expand="lg" fixed="top">
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
              {adminMenu}
              {userMenu}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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