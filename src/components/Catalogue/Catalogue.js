import React, { useEffect,useState } from 'react';
import { Button,Row,Col,Alert,
    Nav,NavItem,NavLink} from 'reactstrap';
import { connect,} from 'react-redux';

import * as actionTypes from '../../store/actions';
import ProductItem from '../ProductItem/ProductItem';



const Catalogue = (props) => {
    const [selected, setSelected] = React.useState(null);
    const [isProducts,setIsProducts] = useState(false)
    const { onInitDepartments } = props;
    

    

    useEffect(()=>{
        onInitDepartments();
    },[onInitDepartments])

    const onClickDepartment = (id) => {
        setIsProducts(false);
        props.onDepartmentProducts(id)
        setSelected(id)
        setIsProducts(true);        
    }

    const ShowDepartments = () => {
        return props.departments.map((item)=>
                <NavItem id={item.id} name={item.id} >
                    <NavLink 
                        href="#" 
                        onClick={() => onClickDepartment(item.id)}                          
                        className={
                            "mb-sm-3 mb-md-0 " + (selected === item.id ? "active" : "")
                        }
                    >
                        {item.name}
                    </NavLink>
                </NavItem>
        );
    }

    const ShowProducts = () => {
        //TODO:Ver como poner el nombre del host rest delante de la url de la foto, actualmente comienza con /media
        
        if (props.products.length === 0){
            console.log(props.products.length)
            return (
                <Col >
                    <Alert color="danger" style={{marginTop: '10%'}} >
                        No hay productos para mostrar
                    </Alert>
                </Col>
            )
        }
        const fixedProducts = []
        props.products.map((item)=>{
            const temp_item = {...item, ['photo']:props.baseURL+item['photo']}
            fixedProducts.push(temp_item)
        });
        console.log(fixedProducts)
        return fixedProducts.map((item) =>
            <ProductItem item={item} />
        )
    }

    return (
        <div style={{marginTop:'60px',textAlign:'center'}}>
            <h1>Catálogo de productos</h1>
            <Row>
            <Col xs="12" sm="2">
            <Nav className=" nav-fill flex-column" pills role="tablist">
                <ShowDepartments/>
            </Nav>
            </Col>
            <Col xs="12" sm="10">

            <Row>
                {
                    isProducts?
                        <ShowProducts/>
                    :
                       null
                }
            </Row>
            </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => {
    return {      
      products: state.products,
      departments: state.departments,
      baseURL: state.baseURL,
    }
}


const mapDispatchToProps = dispatch => {
    return{
      onInitDepartments: () => dispatch(actionTypes.initDepartments()),
      onDepartmentProducts: (id) => dispatch(actionTypes.departmentProducts(id)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Catalogue);