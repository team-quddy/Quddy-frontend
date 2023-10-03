import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

const getInstance = () =>
  axios.create({
    baseURL: `${BASE_URL}/api`,
    timeout: 2000,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": BASE_URL,
    },
    withCredentials: true,
  });

export default getInstance;
