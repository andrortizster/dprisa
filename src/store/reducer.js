import  * as actionTypes from './actionsTypes';

const initialState = {
    baseURL: 'https://brinpack.pythonanywhere.com',
    products:[],
    departments:[],
}


const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.SET_PRODUCTS:
            return{
                ...state,
                products: action.products
            }   
        case actionTypes.SET_DEPARTMENTS:
            return{
                ...state,
                departments: action.departments
            }   
        default:
            return state;
    }
}

export default reducer;