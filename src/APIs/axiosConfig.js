import axios from 'axios';
import { t } from 'i18next';

import { toast } from 'react-toastify';

console.log('t', 'https://ekyc-admin.adkatech.com/api');
const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8000/api',
  baseURL: 'https://ekyc-admin.adkatech.com/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 400:
          const notifyError = () => toast.error(error.response.data.message);
          notifyError();
          console.error('Bad Request');
          break;
        case 401:
          window.location.href = '/login';
          break;
        case 422:
            const notifyParameters = () => toast.error(t('Parameters Error'));
            notifyParameters();
            console.error('Unauthorized');
            break;
        case 403:
          console.error('Forbidden');
          break;
        case 404:
          console.error('Not Found');
          break;
        case 500:
          console.error('Internal Server Error');
          break;
        default:
          console.error('Unhandled error');
      }
    } else if (error.request) {
      console.error('Network error');
    } else {
      console.error('Error', error.message);
    }
    return Promise.reject(error);
  });

export default axiosInstance;




