import { api } from "./client";
import type { ListResponse, Role, User } from "../types";

export async function listUsers(page: number): Promise<ListResponse<User>> {
  const response = await api.get<ListResponse<User>>("/admin/users", { params: { page, limit: 10 } });
  return response.data;
}

export async function getUser(id: string): Promise<User> {
  const response = await api.get<{ data: User }>(`/admin/users/${id}`);
  return response.data.data;
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: Role;
  interests: string[];
}): Promise<User> {
  const response = await api.post<{ data: User }>("/admin/users", input);
  return response.data.data;
}

export async function updateUser(
  id: string,
  input: { name: string; email: string; role: Role; interests: string[] },
): Promise<User> {
  const response = await api.put<{ data: User }>(`/admin/users/${id}`, input);
  return response.data.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/admin/users/${id}`);
}
