import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.aladhan.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});