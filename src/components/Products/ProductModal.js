import {useEffect} from 'react';
import {
    Modal,
    Form,
    FloatingLabel,
    Row,
    Col,
} from 'react-bootstrap';
import { connect,} from 'react-redux';

import * as actionTypes from '../../store/actions';

const ProductModal = (props) =>{

    const {onInitUm, onInitDepartments} = props

    useEffect(()=>{
        onInitUm();
        onInitDepartments();
    },[onInitUm,onInitDepartments])

    const handleShow = () => {
        props.setModal(!props.modal)
    }

    return(
        <Modal show={props.modal}  onHide={handleShow}>
            <Modal.Header closeButton>
                <Modal.Title>Editar producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formName">
                        <FloatingLabel controlId="floatingNameGrid" label="Nombre">
                        <Form.Control type="text" placeholder="Entre un nombre" value={props.item===null?null:props.item.name} />
                        </FloatingLabel>
                    </Form.Group>                
                    <Form.Group className="mb-3" controlId="formDescription">
                        <FloatingLabel controlId="floatingDescriptionGrid" label="Descripción">
                            <Form.Control as="textarea" rows={5} placeholder="Entre una descripción" value={props.item===null?null:props.item.description} />
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