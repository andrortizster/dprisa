import {useEffect,useState} from 'react';
import {
    Modal,
    Form,
    FloatingLabel,
    Row,
    Col,
    Button,
    Alert,
} from 'react-bootstrap';
import { connect,} from 'react-redux';

import * as actionTypes from '../../store/actions';
import no_photo from '../../assets/img/no_photo.png';
import axios from '../../axios';

const ProductModal = (props) =>{

    const {onInitUm, onInitDepartments, item} = props
        
    const [activeItem,setActiveItem] = useState([]);

    const [alert,setAlert] = useState(false);

    useEffect(()=>{
        onInitUm();
        onInitDepartments();
    },[onInitUm,onInitDepartments])

    useEffect(()=>{
        setActiveItem(item);
    },[item])

    const handleShow = () => {
        props.setModal(!props.modal);
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (e.target.files===null || e.target.files===undefined){
            setActiveItem({ ...activeItem, [name]: value });            
        }else{
            console.log(e.target.files[0]);
            setActiveItem({ ...activeItem, [name]: e.target.files[0] });
        }
    }

    const handleSubmit = () => {
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        };

        let form = new FormData();
        form.append('name',activeItem.name);
        form.append('description',activeItem.description);
        if(typeof activeItem.photo !== 'string' || !activeItem.photo instanceof String){
            form.append('photo',activeItem.photo);
        }
        form.append('shop',activeItem.shop);
        form.append('um',activeItem.um);
        form.append('department',activeItem.department);
        form.append('brand',activeItem.brand);
        form.append('model',activeItem.model);
        form.append('price',activeItem.price);

        if (activeItem.id===undefined){
            axios
            .post('/products/',form,config)
            .then(response=>{
                console.log(response.data)
                handleShow();
                props.refreshList()
            })
            .catch(error =>{
                setAlert(true);
            });
        }else{
            axios
            .put('/products/'+activeItem.id+'/',form,config)
            .then(response=>{
                console.log(response.data)
                handleShow();
                props.refreshList()
            })
            .catch(error =>{
                setAlert(true);
            });
        }
    }

    return(
        <Modal show={props.modal}  onHide={handleShow}>
            <Modal.Header closeButton>
                <Modal.Title>Editar producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formPhoto">
                        <div style={{textAlign:"center"}}>
                        <img src={props.item===null?no_photo:props.item.photo} height="128px" alt="Foto"  />
                        </div>
                        <Form.Control
                            type="file"
                            name="photo"
                            onChange={handleChange}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formName">
                        <FloatingLabel controlId="floatingNameGrid" label="Nombre">
                        <Form.Control 
                            type="text" 
                            placeholder="Entre un nombre" 
                            defaultValue={props.item===null?null:props.item.name} 
                            name="name"
                            onChange={handleChange}
                        />
                        </FloatingLabel>
                    </Form.Group>                
                    <Form.Group className="mb-3" controlId="formDescription">
                        <FloatingLabel controlId="floatingDescriptionGrid" label="Descripción">
                            <Form.Control 
                                as="textarea" 
                                rows={5} 
                                name="description"
                                placeholder="Entre una descripción" 
                                defaultValue={props.item===null?null:props.item.description}
                                onChange={handleChange} />

                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group style={{marginBottom:"15px"}}>
                        <FloatingLabel controlId="floatingDepGrid" label="Departamento">
                            <Form.Select 
                                aria-label="Departamento" 
                                name="department"
                                defaultValue={props.item===null?null:props.item.department}
                                onChange={handleChange} >
                                <option>Seleccione una opción</option>
                                {props.departments.map((item)=>( 
                                    <option value={item.id}  >{item.name}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    <Row className="g-2" style={{marginBottom:"15px"}}>
                        <Col md>
                            <FloatingLabel controlId="floatingBrandGrid" label="Marca">
                                <Form.Control 
                                    type="text" 
                                    name="brand"
                                    defaultValue={props.item===null?null:props.item.brand} 
                                    onChange={handleChange} />
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingModelGrid" label="Modelo">
                                <Form.Control 
                                    type="text" 
                                    name="model"
                                    defaultValue={props.item===null?null:props.item.model} 
                                    onChange={handleChange} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="g-2" style={{marginBottom:"15px"}}>
                        <Col md>
                            <FloatingLabel controlId="floatingPriceGrid" label="Precio">
                                <Form.Control 
                                    type="text" 
                                    name="price"
                                    defaultValue={props.item===null?null:props.item.price} 
                                    onChange={handleChange} />
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingUMGrid" label="Unidad de medida">
                            <Form.Select 
                                aria-label="Floating label select example" 
                                defaultValue={props.item===null?null:props.item.um}
                                name="um"
                                onChange={handleChange} >
                                <option>Seleccione una opción</option>
                                {props.um.map((item)=>( 
                                    <option value={item.id}  >{item.name}</option>
                                ))}
                            </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    {
                        alert?
                        <Alert variant="danger">Ocurrió un error guardando los datos, por favor revíselos.</Alert>:
                        null
                    }
                    <Form.Group style={{textAlign:"right"}}>
                        <Button variant="success" onClick={handleSubmit}>Enviar</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {      
      um: state.um,
      departments: state.departments,
    }
}

const mapDispatchToProps = dispatch => {
    return{
      onInitUm: () => dispatch(actionTypes.initUm()),
      onInitDepartments: () => dispatch(actionTypes.initDepartments())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductModal);