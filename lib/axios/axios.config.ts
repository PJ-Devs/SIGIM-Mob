import axios from "axios";

const API_URL = 'http://192.168.1.4:8000/api/';

const APIInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default APIInstance;