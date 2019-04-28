import axios from "axios";
import Config from "react-native-config";

export const baseAPI = axios.create({
  baseURL: Config.BASE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
