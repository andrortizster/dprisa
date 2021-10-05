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
import no_photo from '../../assets/img/no_photo.png';

const DepartmentsModal = (props) =>{

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
        form.append('shop',activeItem.shop);
        if(typeof activeItem.photo !== 'string' || !activeItem.photo instanceof String){
            form.append('photo',activeItem.photo);
        }

        if (activeItem.id===undefined){
            axios
            .post('/departments/',form,config)
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
            .put('/departments/'+activeItem.id+'/',form,config)
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
                <Modal.Title>Editar Departments</Modal.Title>
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


export default DepartmentsModal;