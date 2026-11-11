import axios from "axios";
import { API_CONFIG, STORAGE_KEYS } from "../constants";
import { ROUTES } from "../routes";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || API_CONFIG.DEFAULT_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      const path = window.location.pathname;
      if (path !== ROUTES.LOGIN && path !== ROUTES.REGISTER) {
        window.location.assign(ROUTES.LOGIN);
      }
    }
    return Promise.reject(error);
  },
);

export function errorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = (error.response?.data as { message?: unknown } | undefined)?.message;
    if (typeof message === "string" && message.length > 0) return message;
  }
  return "Something went wrong";
}

export function formatWhen(value: string): string {
  return new Date(value).toLocaleString();
}

export function parseInterests(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}
