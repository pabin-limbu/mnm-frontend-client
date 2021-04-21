//creating instance of axios so that it can be reused.

import axios from "axios";
import { api } from "../urlConfig";

/**send token in headers:--> api will check if valid user or not */
const token = window.localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
});

export default axiosInstance;