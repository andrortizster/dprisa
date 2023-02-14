import React from 'react';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Button} from 'reactstrap';

const WhatsApp =()=>{
    return (<Button color="danger" title="Añadir a favoritos" onClick={toFavorites} >
    <FontAwesomeIcon icon={faHeart} />
</Button>)
}

export default WhatsApp;