import { api } from "./client";
import { API_CONFIG, API_ENDPOINTS } from "../constants";
import type { ListResponse, Role, User } from "../types";

export async function listUsers(page: number): Promise<ListResponse<User>> {
  const response = await api.get<ListResponse<User>>(API_ENDPOINTS.ADMIN_USERS, {
    params: { page, limit: API_CONFIG.PAGE_SIZE },
  });
  return response.data;
}

export async function getUser(id: string): Promise<User> {
  const response = await api.get<{ data: User }>(API_ENDPOINTS.adminUserById(id));
  return response.data.data;
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: Role;
  interests: string[];
}): Promise<User> {
  const response = await api.post<{ data: User }>(API_ENDPOINTS.ADMIN_USERS, input);
  return response.data.data;
}

export async function updateUser(
  id: string,
  input: { name: string; email: string; role: Role; interests: string[] },
): Promise<User> {
  const response = await api.put<{ data: User }>(API_ENDPOINTS.adminUserById(id), input);
  return response.data.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(API_ENDPOINTS.adminUserById(id));
}
