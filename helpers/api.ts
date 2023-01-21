import axios from "axios";

axios.defaults.baseURL = process.env.API_HOST;

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

export default axios;
