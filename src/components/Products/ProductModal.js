import {useEffect,useState} from 'react';
import {
    Modal,
    Form,
    FloatingLabel,
    Row,
    Col,
    Button,
} from 'react-bootstrap';
import { connect,} from 'react-redux';

import * as actionTypes from '../../store/actions';
import no_photo from '../../assets/img/no_photo.png';
import axios from '../../axios';

const ProductModal = (props) =>{

    const {onInitUm, onInitDepartments, item} = props
        
    const [activeItem,setActiveItem] = useState([])

    useEffect(()=>{
        onInitUm();
        onInitDepartments();
        console.log(activeItem)
    },[onInitUm,onInitDepartments])

    useEffect(()=>{
        setActiveItem(item)
        //setActiveItem({...activeItem, photo: null})
        console.log(activeItem)
    },[item])

    const handleShow = () => {
        props.setModal(!props.modal)
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setActiveItem({ ...activeItem, [name]: value });
    }

    const handleSubmit = () => {
        console.log(activeItem);
        axios
        .put('/products/'+activeItem.id+'/',activeItem)
        .then(response=>{
            console.log(response.data)
        })
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
                            <Form.Select aria-label="Departamento" defaultValue={props.item===null?null:props.item.department}>
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
                                <Form.Control type="text" value={props.item===null?null:props.item.brand}  />
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingModelGrid" label="Modelo">
                                <Form.Control type="text" value={props.item===null?null:props.item.model}  />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="g-2" style={{marginBottom:"15px"}}>
                        <Col md>
                            <FloatingLabel controlId="floatingPriceGrid" label="Precio">
                                <Form.Control type="text" value={props.item===null?null:props.item.price}  />
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingUMGrid" label="Unidad de medida">
                            <Form.Select aria-label="Floating label select example" defaultValue={props.item===null?null:props.item.um}>
                                <option>Seleccione una opción</option>
                                {props.um.map((item)=>( 
                                    <option value={item.id}  >{item.name}</option>
                                ))}
                            </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
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