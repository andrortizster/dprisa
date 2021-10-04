import React, {useEffect, useState} from 'react';
import {
    Table,
    Button,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import { connect,} from 'react-redux';
import {faPlusCircle,faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import UmRow from './UmRow';
import * as actionTypes from '../../store/actions';
import Modal from './UmModal';

const Um = (props) => {
    const {um, onInitUm} = props;
    const [modal,setModal] = useState(false);
    const [activeItem,setActiveItem] = useState(null)
    const [searchValue,setSearchValue] = useState('')

    useEffect(()=>{
        onInitUm()
    },[onInitUm])

    const RowData = () =>{
        const filteredItems = props.um.filter(lista => {
            return lista.name.toLowerCase().includes(searchValue.toLowerCase());
          });

        return filteredItems.map((item)=> <UmRow item={item} handleEdit={handleEdit} /> )
    }

    const handleEdit = (item) =>{
        setActiveItem(item);
        setModal(true);
    }

    const handleNew = () =>{
        setActiveItem({
            name: null,
        })

        setModal(true);
    }

    const searchChange = (e) =>{
        setSearchValue(e.target.value)
    }

    return(
        <div  style={{marginTop:'70px'}}>
        <h2>Edición de unidades de medida</h2>
        <div style={{display:"flex",justifyContent:"space-between", marginBottom:"10px",}}>
            <Button 
                width="520px" 
                variant="success"
                onClick={handleNew}
            >
                <FontAwesomeIcon icon={faPlusCircle}/> Nueva unidad de medida
            </Button>
            <div></div>
                <input type="text" placeholder="Buscar" style={{borderRadius:"5px"}}  onChange={searchChange} />
        </div>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                <RowData />
            </tbody>
        </Table>
            <Modal
                item={activeItem}
                modal={modal}
                setModal={setModal}
                refreshList={props.onInitUm}
            />
        </div>
    );

}

const mapStateToProps = state => {
    return {      
      um: state.um,
    }
}

const mapDispatchToProps = dispatch => {
    return{
      onInitUm: () => dispatch(actionTypes.initUm()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Um);