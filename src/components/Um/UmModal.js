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

const UmModal = (props) =>{

    const {item} = props
        
    const [activeItem,setActiveItem] = useState([]);

    const [alert,setAlert] = useState(false);

    useEffect(()=>{
        setActiveItem(item);
    },[item])

    const handleShow = () => {
        props.setModal(!props.modal);
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setActiveItem({ ...activeItem, [name]: value });
    }

    const handleSubmit = () => {
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        };

        let form = new FormData();
        form.append('name',activeItem.name);

        if (activeItem.id===undefined){
            axios
            .post('/um/',form,config)
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
            .put('/um/'+activeItem.id+'/',form,config)
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
                <Modal.Title>Editar um</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
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


export default UmModal;