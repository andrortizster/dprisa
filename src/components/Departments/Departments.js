import React, {useEffect, useState} from 'react';
import {
    Table,
    Button,
} from 'react-bootstrap';
import { connect,} from 'react-redux';
import {faPlusCircle,faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SweetAlert from 'react-bootstrap-sweetalert';

import DepartmentsRow from './DepartmentsRow';
import * as actionTypes from '../../store/actions';
import Modal from './DepartmentsModal';
import axios from '../../axios';

const Departments = (props) => {
    const {Departments, onInitDepartments} = props;
    const [modal,setModal] = useState(false);
    const [activeItem,setActiveItem] = useState(null)
    const [searchValue,setSearchValue] = useState('')
    const [visibleAlert,setVisibleAlert] = useState(false)

    useEffect(()=>{
        onInitDepartments()
    },[onInitDepartments])

    const RowData = () =>{
        const filteredItems = props.departments.filter(lista => {
            return lista.name.toLowerCase().includes(searchValue.toLowerCase());
          });

        return filteredItems.map((item)=> <DepartmentsRow item={item} handleEdit={handleEdit} handleAlert={handleAlert} /> )
    }

    const handleEdit = (item) =>{
        setActiveItem(item);
        setModal(true);
    }

    const handleAlert = (item) =>{
        setVisibleAlert(!visibleAlert);
        setActiveItem(item);
    }

    const handleDelete = (item) =>{
        axios
        .delete('/departments/'+item.id+'/',item)
        .then(res=>{
            console.log(res)
            props.onInitDepartments();
        })
        setVisibleAlert(false);

    }
    
    const handleNew = () =>{
        setActiveItem({
            name: null,
            shop: 2,
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
                <FontAwesomeIcon icon={faPlusCircle}/> Nuevo departamento
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
                refreshList={props.onInitDepartments}
            />
        {
            visibleAlert?
                <SweetAlert
                    warning
                    showCancel
                    cancelBtnBsStyle="primary"
                    cancelBtnText="Cancelar"
                    confirmBtnText="Borrar"
                    confirmBtnBsStyle="danger"
                    title="Está seguro?"
                    onConfirm={()=>handleDelete(activeItem)}
                    onCancel={()=>setVisibleAlert(!visibleAlert)}
                    focusCancelBtn
                >
                    Recuerde que solo podrá borrar los departamentos que NO tienen productos asociados 
                </SweetAlert>:
                null
        }
        </div>
    );

}

const mapStateToProps = state => {
    return {      
      departments: state.departments,
    }
}

const mapDispatchToProps = dispatch => {
    return{
      onInitDepartments: () => dispatch(actionTypes.initDepartments()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Departments);