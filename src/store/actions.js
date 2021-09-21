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

const setUser = (usr)=>{
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




/*const setTask = (task)=>{
    return {
        type: actionTypes.SET_TASK,
        task: task
    }

} 

export const initTask = (taskId)=>{
    return dispatch => {
        axios.get("/todos/"+taskId+"/")
            .then(response=>{
                dispatch(setTask(response.data))
            })
    }
}

const setComments = (comments)=>{
    console.log('setComments')
    return {
        type: actionTypes.SET_COMMENTS,
        comments: comments
    }

} 

export const initComments = (taskId)=>{
    console.log('initComments')
    return dispatch => {
        axios.get("/todos/"+taskId+"/comments/")
            .then(response=>{
                console.log(response.data)
                dispatch(setComments(response.data))
            })
    }
}

export const setActiveItem = (activeItem)=>{
    return {
        type: actionTypes.SET_ACTIVEITEM,
        activeItem: activeItem
    }
}*/