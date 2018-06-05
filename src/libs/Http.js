import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded';

const axiosInstance = axios.create({
  baseURL: "http://13.125.127.34:3000",
  headers: {
    // "Access-Control-Allow-Origin": "*"
  }
});

export default axiosInstance;