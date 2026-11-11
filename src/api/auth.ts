import { api } from "./client";
import { API_ENDPOINTS } from "../constants";
import type { User } from "../types";

export async function register(input: {
  name: string;
  email: string;
  password: string;
  interests: string[];
}): Promise<User> {
  const response = await api.post<{ data: User }>(API_ENDPOINTS.AUTH_REGISTER, input);
  return response.data.data;
}

export async function login(email: string, password: string): Promise<{ accessToken: string; user: User }> {
  const response = await api.post<{ data: { accessToken: string; user: User } }>(API_ENDPOINTS.AUTH_LOGIN, {
    email,
    password,
  });
  return response.data.data;
}

export async function me(): Promise<User> {
  const response = await api.get<{ data: User }>(API_ENDPOINTS.AUTH_ME);
  return response.data.data;
}

export async function updateProfile(input: {
  name: string;
  email: string;
  interests: string[];
}): Promise<User> {
  const response = await api.put<{ data: User }>(API_ENDPOINTS.AUTH_ME, input);
  return response.data.data;
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await api.post(API_ENDPOINTS.AUTH_CHANGE_PASSWORD, { currentPassword, newPassword });
}
