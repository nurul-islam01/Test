import axios from "axios";

const BASE_URL = "http://localhost:4000/";

const api = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  instance.defaults.withCredentials = true;
  return instance;
};

export default api;
