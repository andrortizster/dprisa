import {
    Row,
    Col,
    Card,
} from 'react-bootstrap';
import {faDollarSign, faShoppingBasket, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Aux from '../../hoc/Auxiliary';
import './Info.css';

const Info = () =>{
    return(        
        <Aux>
            <Row style={{marginTop:"10px"}}>
                <Col xs="12" sm="4">
                    <Card>
                        <Card.Header className="InfoCol">                   
                            <div className="InfoIco">
                                <FontAwesomeIcon icon={faDollarSign} className="InfoSign" />
                            </div>
                        </Card.Header>
                        <Card.Title style={{textAlign:"center"}}> 
                            Seguridad para su inversión
                        </Card.Title>
                        <Card.Body>
                            Su dinero está a salvo con nosotros, tenemos total confianza en que podemos 
                            hacer una compra que le sea de su agrado de acuerdo a la suma que ponga en 
                            nuestras manos. Además podrá saber en todo momento que uso le damos a su dinero.
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="12" sm="4">
                    <Card>
                        <Card.Header className="InfoCol">                   
                            <div className="InfoIco">
                                <FontAwesomeIcon icon={faShoppingBasket} className="InfoSign" />
                            </div>
                        </Card.Header>
                        <Card.Title style={{textAlign:"center"}}> 
                            Compras personalizadas
                        </Card.Title>
                        <Card.Body>
                            Ponemos un comprador a su disposición, usted podrá estar con el en el momento de 
                            la compra en zona libre. El comprador lo llevará a los lugares donde se encuentra
                            la mejor mercancía de acuerdo a su lista de deseos.
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="12" sm="4">
                    <Card>
                        <Card.Header className="InfoCol">                   
                            <div className="InfoIco">
                                <FontAwesomeIcon icon={faPaperPlane} className="InfoSign" />
                            </div>
                        </Card.Header>

                        <Card.Title style={{textAlign:"center"}}> 
                            Envío inmediato
                        </Card.Title>
                        <Card.Body>
                            Una vez concluida la compra, su mercancía será empaquetada y enviada de inmediato
                            así garantizamos que sea embarcada lo antes posible. También ponemos a su disposición
                            los números de los paquetes para que pueda comprobar su estado durante el envío.
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    )
}

export default Info;