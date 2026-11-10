import { api } from "./client";
import type { User } from "../types";

export async function register(input: {
  name: string;
  email: string;
  password: string;
  interests: string[];
}): Promise<User> {
  const response = await api.post<{ data: User }>("/auth/register", input);
  return response.data.data;
}

export async function login(email: string, password: string): Promise<{ accessToken: string; user: User }> {
  const response = await api.post<{ data: { accessToken: string; user: User } }>("/auth/login", {
    email,
    password,
  });
  return response.data.data;
}

export async function me(): Promise<User> {
  const response = await api.get<{ data: User }>("/auth/me");
  return response.data.data;
}

export async function updateProfile(input: {
  name: string;
  email: string;
  interests: string[];
}): Promise<User> {
  const response = await api.put<{ data: User }>("/auth/me", input);
  return response.data.data;
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await api.post("/auth/change-password", { currentPassword, newPassword });
}
