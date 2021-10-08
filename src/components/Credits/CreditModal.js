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

import axios from '../../axios';

const CreditModal = (props) =>{

    const [validated, setValidated] = useState(false);

    const {item} = props

    const [alert,setAlert] = useState(false);

    const [activeItem,setActiveItem] = useState([]);

    useEffect(()=>{
        setActiveItem(item);
    },[item])

    const handleShow = () => {
        props.setModal(!props.modal);
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }

        console.log(activeItem)

        axios
        .post("/credits/",activeItem)
        .then(res=>{
            props.setModal(false);
            props.refreshList();
            setValidated(true);
        })
        .catch(error=>{
            setAlert(true);
        })

        
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        setActiveItem({ ...activeItem, [name]: value });       
        console.log(activeItem)
    }

    return(
        <Modal show={props.modal}  onHide={handleShow}>
            <Modal.Header closeButton>
                <Modal.Title>Nuevo crédito</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <FloatingLabel controlId="floatingNameGrid" label="Importe*">
                        <Form.Control 
                            required
                            type="number" 
                            placeholder="Entre una cantidad" 
                            min="1"
                            step="0.01"
                            defaultValue={props.item===null?null:props.item.name} 
                            name="amount"
                            onChange={handleChange}
                        />
                        </FloatingLabel>
                    </Form.Group>                
                    
                    {
                        alert?
                        <Alert variant="danger">Ocurrió un error guardando los datos, por favor revíselos.</Alert>:
                        null
                    }
                    <Form.Group style={{textAlign:"right"}}>
                        <Button variant="success" type="submit" >Enviar</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreditModal;