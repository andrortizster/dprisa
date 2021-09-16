import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://brinpack.pythonanywhere.com'
});



export default instance;