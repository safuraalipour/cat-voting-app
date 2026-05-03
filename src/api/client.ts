import axios from 'axios';

const API_KEY = 'live_yIephPasnbpbdRf1sSvaGPdMYGwPWXbRAs3GMY0NFIXU4aVSgDOsZG09vpjglqmE'; 

export const apiClient = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  },
});