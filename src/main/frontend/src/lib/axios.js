// src/lib/axios.js
import axios from 'axios';

const url = 'http://localhost:9000/api';

const instance = axios.create({
    baseURL : url,
});

export default instance;