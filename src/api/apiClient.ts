import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.sorobanlearn.com/api",
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Accept": "application/json",
  },
});
