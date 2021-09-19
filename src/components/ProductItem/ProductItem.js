import React, {useState} from 'react'; 
import { 
    Col,Card, CardImg, CardText, 
    CardBody,CardTitle, Button,
} from 'reactstrap';
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


import no_photo from '../../assets/img/no_photo.png';
import Modal from '../ProductDetail/ProductDetail';

 const ProductItem = (props) => {
    const [modal,setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    const toFavorites = () =>{
        console.log('Added to favorites');
        
    }

    const modalProduct = () => {
        setModal(!modal);
    }

    return(
        <Col xs="12" sm="4">
            <Card>
                
                {
                    props.item.photo===null?
                    <CardImg top  src={no_photo} alt={props.item.name} height="250px" onClick={modalProduct} />:
                    <CardImg top  src={props.item.photo.includes("null")?no_photo:props.item.photo} alt={props.item.name} height="250px" onClick={modalProduct} />
                }
                
                <CardBody>
                <CardTitle tag="h5">{props.item.name}</CardTitle>
                <CardText>{props.item.description}</CardText>
                <Button color="danger" title="Añadir a favoritos" onClick={toFavorites} >
                    <FontAwesomeIcon icon={faHeart} />
                </Button>
                </CardBody>
            </Card>

            {modal ? (
                <Modal
                    activeItem={props.item}
                    toggle = {toggle}
                    toFavorites = {toFavorites}
                />
            ) : null}
        </Col>


    );
 }

 export default ProductItem;