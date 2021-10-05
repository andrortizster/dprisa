import  * as actionTypes from './actionsTypes';

const initialState = {
    baseURL: 'https://brinpack.pythonanywhere.com',
    //baseURL: 'http://localhost:8000',
    products:[],
    departments:[],
    user: [],
    users: [],
    credits: [],
    favourites: [],
    um: [],
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
        case actionTypes.SET_USER:
            return{
                ...state,
                user: action.usr
            }   
        case actionTypes.SET_USERS:
            return{
                ...state,
                users: action.usrs
            }   
        case actionTypes.SET_CREDITS:
            return{
                ...state,
                credits: action.crd
            }   
        case actionTypes.SET_FAVOURITES:
            return{
                ...state,
                favourites: action.fvt
            }   
        case actionTypes.SET_UM:
            return{
                ...state,
                um: action.um
            }   
        default:
            return state;
    }
}

export default reducer;