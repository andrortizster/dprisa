import React,{useState, useEffect} from 'react'; 
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col,
    Alert,
    Table
} from 'reactstrap';
import axios from '../../axios';
import { connect,} from 'react-redux';

import './UserSettings.css';
import * as actionTypes from '../../store/actions';
import ProductItem from '../ProductItem/ProductItem'

const UserSettings = (props) =>{
    const { initCredits,initFavourites,user } = props;
    const [prod_fav,setProd_fav] = useState([])
    useEffect(()=>{
        initCredits(user['id']);
        
    },[initCredits,initFavourites,user])

    useEffect(()=>{
        initFavourites(user['id']);
    },[initFavourites,user])

    const ShowCredits = () => {
        props.credits.map((item)=>{
            console.log(item.amount)
        })
        
        return props.credits.map((item)=> (
            <tr>
                <td>
                    {item.creation_date}
                </td>
                <td>
                    {item.amount}
                </td>
            </tr>
        ));
    }

    const  handleChange = (e) => {
        let { name, value } = e.target;
        props.setUser({ ...props.user, [name]: value });
    }

    const handleSave = () => {
        console.log(props.user)
        const item = { 
            id: props.user['id'], 
            email: props.user['email'], 
            username: props.user['username'], 
            dni: props.user['dni'], 
            first_name: props.user['first_name'], 
            last_name:props.user['last_name'] ,
            credit_amount: props.user['credit_amount'], 
            credit_reserved: props.user['credit_reserved'] 
        }
        axios
        .put('/users/'+item['id']+'/', item)
        .then((res) => {
            console.log('success');
        })
        .catch(error => {
            console.log('error');
           
        });
    }

    const Prods = () => {
        console.log(props.favourites)
        
        props.favourites.map((item)=>{
            axios
            .get('/products/'+item.product+'/')
            .then((res)=>{

                setProd_fav(prod_fav.concat(res.data))
            })
            .catch(error=>{
                console.log(error)
            })
        })

        console.log(prod_fav);
        
        /*return prod_fav.map((item)=>
            <ProductItem item={item}  />
        )*/
        return <div>Favoritos</div>
    }


    return (
        <div style={{marginTop:'70px',textAlign:'center'}}>
            <div className="Title">Ajustes del usuario</div>
            <img src={props.baseURL+props.user['photo']} alt={props.user.username} className="UserBigPhoto" />
            <Row className="UserSetting">
                <Col xs="12" sm="6" >
                    <div className="Title">Modificar datos personales</div>
                    <Form className="UsCol">
                        <FormGroup>
                            <Label for="dni" >Dni</Label>
                            <Input type="text" name="dni" value={props.user['dni']} onChange={handleChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="first_name" >Nombre(s)</Label>
                            <Input type="text" name="first_name" value={props.user['first_name']} onChange={handleChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="last_name" >Apellidos</Label>
                            <Input type="text" name="last_name" value={props.user['last_name']} onChange={handleChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" >Correo electrónico</Label>
                            <Input type="text" name="email" value={props.user['email']} onChange={handleChange}></Input>
                        </FormGroup>
                        
                        <FormGroup style={{textAlign:"center",marginTop:"10px"}}>
                            <Button color="success" onClick={handleSave}>Guardar cambios</Button>
                        </FormGroup>
                    </Form>
                </Col>
                <Col xs="12" sm="6" >
                    <div className="Title">Datos de interés</div>
                    <Alert color="info">
                    <Row>
                        <Col sm="6" ><strong>Crédito:</strong> {props.user.credit_amount}$</Col>
                        <Col sm="6"><strong>Crédito reservado:</strong> {props.user.credit_reserved}$</Col>
                    </Row>
                    </Alert>
                        <Table bordered responsive striped size="sm">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Cantidad acreditada</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ShowCredits />
                            </tbody>
                        </Table>
                </Col>
            </Row>
            <div className="Title">
                Lista de deseos
            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {      
      user: state.user,
      baseURL: state.baseURL,
      credits: state.credits,
      favourites: state.favourites
    }
}


const mapDispatchToProps = dispatch => {
    return{
        onInitUser: (usr) => dispatch(actionTypes.initUser(usr)),
        initCredits: (usr) => dispatch(actionTypes.initCredits(usr)),
        initFavourites: (usr) => dispatch(actionTypes.initFavourites(usr)),
        setUser: (usr) => dispatch(actionTypes.setUser(usr)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserSettings);