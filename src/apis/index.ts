import axios from "axios";

const BASE_URL = "http://localhost:8000";

const getInstance = () =>
  axios.create({
    baseURL: `${BASE_URL}/api`,
    timeout: 2000,
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": BASE_URL,
    },
    withCredentials: true,
  });

export default getInstance;
