import React,{useState,useEffect} from 'react';
import { connect,} from 'react-redux';
import { 
    FloatingLabel,
    Form,
    Row,
    Col,
} from 'react-bootstrap';

import * as actionTypes from '../../store/actions';
import UserRow from './UserRow';
import './Users.css';

const Users = (props) => {
    const {initUsers} = props;
    const [searchValue,setSearchValue] = useState('')

    useEffect(()=>{
        initUsers()
    },[initUsers])

    const searchChange = (e) =>{
        setSearchValue(e.target.value)
    }

    const RowData = () =>{
        const filteredItems = props.users.filter(lista => {
            return lista.first_name.toLowerCase().includes(searchValue.toLowerCase());
          });

        return filteredItems.map((item)=> <UserRow item={item} setActiveUser={props.setActiveUser}  /> )
    }

    return(
        <div style={{marginLeft:"5px", marginRight:"5px"}}>
        <Row>
            <FloatingLabel controlId="floatingNameGrid" label="Buscar">
                <Form.Control 
                    type="text" 
                    placeholder="Buscar" 
                    name="name"
                    onChange={searchChange}
                />
            </FloatingLabel>
        </Row>
        <hr/>
        <RowData />
        </div>
    )

}
const mapStateToProps = state => {
    return {      
      users: state.users,
    }
}

const mapDispatchToProps = dispatch => {
    return{
      initUsers: () => dispatch(actionTypes.initUsers()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);