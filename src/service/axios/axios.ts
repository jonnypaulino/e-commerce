import axios from "axios";
const http = axios.create({
  baseURL: "https://viacep.com.br/",
});

export default http;