import { 
    Row,
    Col, 
} from "react-bootstrap"

const UserRow= (props) => {
    return(
        <Row className="UserRow" onClick={() => props.setActiveUser(props.item)}> 
            {props.item.first_name}
        </Row>
    )
}

export default UserRow;