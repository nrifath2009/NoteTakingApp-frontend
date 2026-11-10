import { api } from "./client";
import type { ListResponse, Note } from "../types";

export async function listNotes(page: number): Promise<ListResponse<Note>> {
  const response = await api.get<ListResponse<Note>>("/notes", { params: { page, limit: 10 } });
  return response.data;
}

export async function listAllNotes(page: number): Promise<ListResponse<Note>> {
  const response = await api.get<ListResponse<Note>>("/admin/notes", { params: { page, limit: 10 } });
  return response.data;
}

export async function getNote(id: string): Promise<Note> {
  const response = await api.get<{ data: Note }>(`/notes/${id}`);
  return response.data.data;
}

export async function createNote(input: { title: string; content: string }): Promise<Note> {
  const response = await api.post<{ data: Note }>("/notes", input);
  return response.data.data;
}

export async function updateNote(id: string, input: { title: string; content: string }): Promise<Note> {
  const response = await api.put<{ data: Note }>(`/notes/${id}`, input);
  return response.data.data;
}

export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}
