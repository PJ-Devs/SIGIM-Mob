import axios from "axios";

const API_URL = 'https://sigim.icu/api';

const APIInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default APIInstance;
