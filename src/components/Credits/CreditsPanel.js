import React, {useEffect,useState} from 'react';
import {
    Row,
    Col,
    Table,
} from 'react-bootstrap';
import { connect,} from 'react-redux';

import Aux from '../../hoc/Auxiliary'; 
import * as actionTypes from '../../store/actions';


const CreditsPanel = (props) =>{
    const [item, setItem] = useState(null)
    const {initCredits} = props;

    useEffect(()=>{
        if (props.activeUser !==null){
            setItem(props.activeUser)
            props.initCredits(props.activeUser.id)
        }
    },[props.activeUser])

    return(
        <div>
            { item !== null?
                <Aux>
                    <div style={{fontSize:"x-large",fontWeight:"bold"}} >Créditos del usuario {item.first_name} {item.last_name}</div>
                    <Row>
                        <Col>
                            Crédito acumulado: {item.credit_amount}
                        </Col>
                        <Col>
                            Crédito reservado: {item.credit_reserved}
                        </Col>
                    </Row>
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