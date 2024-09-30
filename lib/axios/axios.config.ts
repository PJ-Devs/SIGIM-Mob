import axios from "axios";

const API_URL = process.env.API_URL;

const APIInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default APIInstance;