import axios from 'axios';

const axios = axios.create({
    baseURL : 'https://gradebook-395ff-default-rtdb.firebaseio.com/'
});

export default axios;

