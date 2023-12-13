/* eslint-disable react-hooks/rules-of-hooks */
import { authErrors } from '@/constants/authErrors';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.sorobanlearn.com/api',
  timeout: 5000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

const responseErrorHandler = (error: any) => {
  const errorMessage = error?.response?.data?.error?.message;

  const isTokenErrorExist = Object.values(authErrors).some(
    (message) => message === errorMessage
  );

  //TODO: Change to status code
  if (isTokenErrorExist) {
    window.location.href = '/logout';
  }

  return Promise.reject(error);
};

apiClient.interceptors.response.use(
  (response) => response,
  responseErrorHandler
);
