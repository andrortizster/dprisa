import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col,
    Alert,
} from 'reactstrap';
import axios from '../../axios';
import { connect,} from 'react-redux';

import './UserSettings.css';

const UserSettings = (props) =>{
    return (
        <div style={{marginTop:'70px',textAlign:'center'}}>
            <div className="Title">Ajustes del usuario</div>
            <Row className="UserSetting">
                <Col xs="10" sm="4" className="UsCol">
                    <Form>
                        <FormGroup>
                            <Label for="dni">Dni</Label>
                            <Input type="text" name="dni" value={props.user['dni']} ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="first_name">Nombre(s)</Label>
                            <Input type="text" name="first_name" value={props.user['first_name']} ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="last_name">Apellidos</Label>
                            <Input type="text" name="last_name" value={props.user['last_name']} ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Correo electrónico</Label>
                            <Input type="text" name="email" value={props.user['email']} ></Input>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => {
    return {      
      user: state.user,
    }
}


const mapDispatchToProps = dispatch => {
    return{
      onInitUser: (usr) => dispatch(actionTypes.initUser(usr)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserSettings);