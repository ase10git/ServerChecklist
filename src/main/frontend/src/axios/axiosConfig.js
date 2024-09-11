// src/lib/axios.js
import axios from 'axios';
axios.defaults.withCredentials = true; // 쿠키 공유 허용

const url = `http://localhost:9000`;

const instance = axios.create({
    baseURL : url
});

export default instance;