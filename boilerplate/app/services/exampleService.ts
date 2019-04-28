import { baseAPI } from "./baseService";

export const getPokemon = () =>
  baseAPI.get("/pokemon").then(response => response.data);
