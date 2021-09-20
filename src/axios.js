import axios from 'axios';

const instance = axios.create({
    //baseURL: 'https://brinpack.pythonanywhere.com'
    baseURL: 'http://localhost:8000'
});



export default instance;