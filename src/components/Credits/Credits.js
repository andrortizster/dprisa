import React, {useState} from 'react';
import {
    Row,
    Col,
} from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';

import Users from '../Users/Users';
import CreditsPanel from './CreditsPanel';

const Credits = () => {
    const [activeUser, setActiveUser] = useState(null);

    return(
        <div  style={{marginTop:'70px'}}>
            <h2>Edición de créditos</h2>
            <Row>
                <Col md={3} xs={12}>
                    <Users setActiveUser={setActiveUser} />
                </Col>
                <Col>
                    <CreditsPanel activeUser={activeUser} initUsers={propTypes.initUsers} />
                </Col>
            </Row>
        </div>

    )   
}

export default Credits