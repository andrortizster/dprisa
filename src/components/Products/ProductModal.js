import {
    Modal,

} from 'react-bootstrap';
const ProductModal = (props) =>{
   return(
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Editar producto</Modal.Title>
            </Modal.Header>
        </Modal.Dialog>
   )
}

export default ProductModal;