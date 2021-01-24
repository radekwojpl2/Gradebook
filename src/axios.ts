import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://gradebook-395ff-default-rtdb.firebaseio.com/'
});

export default instance;

