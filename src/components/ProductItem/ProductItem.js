import React, {useState} from 'react'; 
import { 
    Col,Card, CardImg, CardText, 
    CardBody,CardTitle, Button,
} from 'reactstrap';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { connect,} from 'react-redux';


import no_photo from '../../assets/img/no_photo.png';
import Modal from '../ProductDetail/ProductDetail';
import axios from '../../axios';

 const ProductItem = (props) => {
    const [modal,setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    const toFavorites = () =>{
        const item = { user: props.user.id, product: props.item.id };
        axios
        .post('/products_wish_list/',item)
        .then((res) => {
            console.log('success')
        })
        .catch(error => {
            console.log('error');
           
        });        
    }

    const modalProduct = () => {
        setModal(!modal);
    }

    return(
        <Col xs="12" sm="3">
            <Card>
                
                {
                    props.item.photo===null?
                    <CardImg top  src={no_photo} alt={props.item.name} height="350px" onClick={modalProduct} />:
                    <CardImg top  src={props.item.photo.includes("null")?no_photo:props.item.photo} alt={props.item.name} height="350px"  onClick={modalProduct} />
                }
                
                <CardBody>
                <CardTitle tag="h5">{props.item.name}</CardTitle>
                <CardText>{props.item.description}</CardText>
                {props.showWish?
                    <Button color="danger" title="Añadir a favoritos" onClick={toFavorites} >
                        <FontAwesomeIcon icon={faHeart} />
                    </Button>:
                    null

                 }
                </CardBody>
            </Card>

            {modal ? (
                <Modal
                    activeItem={props.item}
                    toggle = {toggle}
                    toFavorites = {toFavorites}
                    showWhish = {props.showWish}
                />
            ) : null}
        </Col>


    );
 }

 const mapStateToProps = state => {
    return {      
      user: state.user,
    }
}


const mapDispatchToProps = dispatch => {
    return{
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductItem);