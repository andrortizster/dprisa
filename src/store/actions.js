import  * as actionTypes from './actionsTypes';
import axios from '../axios'


const setProducts = (products)=>{
    console.log(products)
    return {
        type: actionTypes.SET_PRODUCTS,
        products: products
    }

} 

export const initProducts = ()=>{
    return dispatch => {
        axios.get("/products/")
            .then(response=>{
                console.log(response.data)
                dispatch(setProducts(response.data))
            })
    }
}

const setDepartments = (departments)=>{
    return {
        type: actionTypes.SET_DEPARTMENTS,
        departments: departments
    }

} 

export const initDepartments = ()=>{
    return dispatch => {
        axios.get("/departments/")
            .then(response=>{
                dispatch(setDepartments(response.data))
            })
    }
}

export const departmentProducts = (id) =>{
    return dispatch => {
        axios.get("/departments/"+id+'/products/')
            .then(response=>{
                dispatch(setProducts(response.data))
            })
    }
}

export const setUser = (usr)=>{
    console.log(usr)
    return {
        type: actionTypes.SET_USER,
        usr: usr
    }

} 

export const initUser = (id) =>{
    console.log(id)

    return dispatch => {
        axios.get("/users/"+id+"/details/")
            .then(response=>{
                console.log(response.data[0])
                dispatch(setUser(response.data[0]))
            })
    }
}

export const setCredits = (crd)=>{
    console.log(crd)
    return {
        type: actionTypes.SET_CREDITS,
        crd: crd
    }

} 

export const initCredits = (id) =>{
    console.log(id)

    return dispatch => {
        axios.get("/users/"+id+"/credits/")
            .then(response=>{
                dispatch(setCredits(response.data))
            })
    }
}


export const setFavourites = (fvt)=>{
    return {
        type: actionTypes.SET_FAVOURITES,
        fvt: fvt
    }

} 

export const initFavourites = (id) =>{

    return dispatch => {
        axios.get("/users/"+id+"/whish_list/")
            .then(response=>{
                dispatch(setFavourites(response.data))
            })
    }
}