import { 
    Row,
    Col, 
} from "react-bootstrap"

const UserRow= (props) => {
    return(
        <Row style={{marginLeft:"5px"}}> 
            {props.item.first_name}
        </Row>
    )
}

export default UserRow;