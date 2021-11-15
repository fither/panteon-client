import axios from 'axios';
import apiURL from '../utils/urls';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Axios = axios.create({
  baseURL: apiURL
})

Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return error.response;
  }
);

Axios.interceptors.response.use(
  (response) => { return response; },
  (error) => { 
    let errorMessage = "";
    if(process.env.NODE_ENV === 'development' && error.isAxiosError) {
      toast.error("Connection Error", {
        position:"top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      return Promise.reject(error);
    }
    if(!!error.response.data) {
      errorMessage = error.response.data;
    } else if(!!error.response) {
      errorMessage = error.response;
    }
    toast.error(
      errorMessage, {
        position:"top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      }
    );
    return error;
  }
);

export default Axios;