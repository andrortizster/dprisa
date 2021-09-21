import React,{useState} from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col,
    Alert,
} from 'reactstrap';
import axios from '../../axios';
import { connect,} from 'react-redux';

import './Login.css'
import avion01 from '../../assets/img/avion01.png';
import * as actionTypes from '../../store/actions';

const Login = (props) => {
    const [error,setError] = useState(false);
    const [mensaje,setMensaje] = useState('');
    const [loginData,setLoginData] = useState({user:'',password:''});

    const validate = () => {
        if (loginData.user===''){
            setMensaje("Debe proporcionar un usuario")
            setError(true);
            return false;
        }
        if (loginData.password===''){
            setMensaje("Debe proporcionar una contraseña")
            setError(true);
            return false;
        }

        setError(false);
        return true;
    }

    const handleLogin = () =>{
        if (validate()){
            const item ={
                username:loginData.user,
                email:"",
                password:loginData.password,
            } 
            axios
            .post("/auth/login/", item)
            .then((res) => {                    
                    localStorage.clear();
                    localStorage.setItem('token', res.data.key);
                    localStorage.setItem('usuario', item.username);
                    props.onInitUser(localStorage.usuario);
                    props.history.push("/");
            })
            .catch(error => {
                console.log(error)
                setMensaje("Usuario o contraseña incorrecto")
                setError(true)
            });
        }
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    return (
        <Row className="LoginForm">
            <Col xs="10" sm="4" className="LoginCol">
                <img src={avion01} alt="logo" height="48px" /><span className="Title">Entrada al sistema</span>
                <Form >
                    <FormGroup>
                        <Label for="user">Usuario</Label>
                        <Input type="text" id="user" name="user" onChange={handleChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Contraseña</Label>
                        <Input type="password" id="password" name="password" onChange={handleChange}></Input>
                    </FormGroup>
                    <FormGroup style={{marginTop:"5px",textAlign:"center"}}>
                        {error?
                            <Alert color="danger">{mensaje}</Alert>:
                            null
                        }
                        <Button color="success" onClick={handleLogin} >Enviar</Button>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    );
}

const mapStateToProps = state => {
    return {      
      user: state.user,
    }
}


const mapDispatchToProps = dispatch => {
    return{
      onInitUser: (usr) => dispatch(actionTypes.initUser(usr)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);