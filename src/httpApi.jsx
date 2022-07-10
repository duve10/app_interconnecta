import axios from "axios";

export default axios.create({
  baseURL: "https://shop.interconnecta.dev",
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authtoken: "9a04d885d66c8a95527220df7ca805",
  },
});
