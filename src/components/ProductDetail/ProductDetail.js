import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row,Col, ModalFooter
} from 'reactstrap'
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

/* esta clase es para mostrar los detalles de un producto en un modal cuando se selecciona */ 
const ProductDetail = (props) => {  

    return(
        <Modal isOpen={true} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>
                {props.activeItem.name}
            </ModalHeader>
            <ModalBody>
                <img src={props.activeItem.photo} width='100%'/>
                <div>
                {props.activeItem.description}
                </div>
                <Row>
                    <Col><strong>Marca:</strong> {props.activeItem.brand}</Col>
                    <Col><strong>Modelo:</strong> {props.activeItem.model}</Col>
                </Row>
                <Row>
                    <Col><strong>Precio:</strong> {props.activeItem.price}</Col>
                    <Col><strong>um:</strong> {props.activeItem.um_name}</Col>
                </Row>
                
            </ModalBody>
            <ModalFooter align="center">
                    <Button color="danger" title="Añadir a favoritos" onClick={props.toFavorites} >
                        <FontAwesomeIcon icon={faHeart} />
                    </Button>
            </ModalFooter>

        </Modal>
    )
}

export default ProductDetail;