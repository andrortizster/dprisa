import React,{useState} from 'react';
import {
    Row,
    Col,
} from 'react-bootstrap';

import Users from '../Users/Users';
import InvoicesPanel from '../Invoices/InvoicesPanel';

const Invoices = (props)=>{
    const [activeUser, setActiveUser] = useState(null);
    return(
        <div  style={{marginTop:'70px'}}>
            <h2>Edición de Facturas</h2>
            <Row>
                <Col md={3} xs={12}>
                    <Users setActiveUser={setActiveUser} />
                </Col>
                <Col>
                    <InvoicesPanel activeUser={activeUser} initUsers={props.initUsers} />
                </Col>
            </Row>
        </div>

    )  

}

export default Invoices;