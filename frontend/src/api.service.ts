import axios from "axios";
import { T_URL } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

function createShortUrl(originalUrl: string) {
  return axios.post<T_URL>(`${API_URL}/create`, {
    original_url: originalUrl
  })
}

function getUrl(shortUrlId: string) {
  return axios.get<T_URL>(`${API_URL}/${shortUrlId}`)
}

function clickUrl(shortUrlId: string) {
  return axios.get<T_URL>(`${API_URL}/${shortUrlId}/click`)
}

export { createShortUrl, getUrl, clickUrl }