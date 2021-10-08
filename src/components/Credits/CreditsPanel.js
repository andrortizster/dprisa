import React, {useEffect,useState} from 'react';
import {
    Row,
    Col,
    Table,
    Button,
} from 'react-bootstrap';

import { connect,} from 'react-redux';

import Aux from '../../hoc/Auxiliary'; 
import * as actionTypes from '../../store/actions';
import Modal from './CreditModal';


const CreditsPanel = (props) =>{
    const [item, setItem] = useState(null);
    const [modal,setModal] = useState(false);
    const [creditItem,setCreditItem] = useState(null);

    useEffect(()=>{
        if (props.activeUser !==null){
            setItem(props.activeUser)
            props.initCredits(props.activeUser.id)
        }
    },[props.activeUser])

    const handleNew = () =>{
        const hoy = new Date(Date.now())
        const creationDate = hoy.getFullYear().toString()+'-'+(hoy.getMonth()+1).toString()+'-'+hoy.getDate().toString()
        setCreditItem({
            amount: null,
            user: props.activeUser.id,
            creation_date: creationDate,
        })

        setModal(true);
    }

    const refreshList = () =>{
        props.iniUsers();
        props.initCredits(props.activeUser.id);

    }

    return(
        <div>
            { item !== null?
                <Aux>
                    <div style={{fontSize:"x-large",fontWeight:"bold"}} >Créditos del usuario {item.first_name} {item.last_name}</div>
                    <Row>
                        <Col>
                            <strong>Crédito acumulado:</strong> {item.credit_amount}
                        </Col>
                        <Col>
                            <strong>Crédito reservado:</strong> {item.credit_reserved}
                        </Col>
                    </Row>
                    <hr/>
                    <Button variant="success" style={{marginBottom:"5px"}} onClick={handleNew}>Nuevo</Button> 
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Fecha</th>
                                <th>Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.credits.map((item)=>(
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.creation_date}</td>
                                        <td>{item.amount}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    <Modal
                        item={creditItem}
                        modal={modal}
                        setModal={setModal}
                        refreshList={refreshList}
                    />
                </Aux>
            :<div style={{fontSize:"x-large",fontWeight:"bold"}} >Seleccione un usuario</div>}
        </div>

    )
}

const mapStateToProps = state => {
    return {      
      credits: state.credits,
    }
}

const mapDispatchToProps = dispatch => {
    return{
      initCredits: (id) => dispatch(actionTypes.initCredits(id)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreditsPanel);