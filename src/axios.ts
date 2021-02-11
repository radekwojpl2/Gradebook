import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://testts-682a9-default-rtdb.firebaseio.com/'
});

export default instance;

