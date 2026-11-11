import { api } from "./client";
import { API_CONFIG, API_ENDPOINTS } from "../constants";
import type { ListResponse, Note } from "../types";

export async function listNotes(page: number): Promise<ListResponse<Note>> {
  const response = await api.get<ListResponse<Note>>(API_ENDPOINTS.NOTES, {
    params: { page, limit: API_CONFIG.PAGE_SIZE },
  });
  return response.data;
}

export async function listAllNotes(page: number): Promise<ListResponse<Note>> {
  const response = await api.get<ListResponse<Note>>(API_ENDPOINTS.ADMIN_NOTES, {
    params: { page, limit: API_CONFIG.PAGE_SIZE },
  });
  return response.data;
}

export async function getNote(id: string): Promise<Note> {
  const response = await api.get<{ data: Note }>(API_ENDPOINTS.noteById(id));
  return response.data.data;
}

export async function createNote(input: { title: string; content: string }): Promise<Note> {
  const response = await api.post<{ data: Note }>(API_ENDPOINTS.NOTES, input);
  return response.data.data;
}

export async function updateNote(id: string, input: { title: string; content: string }): Promise<Note> {
  const response = await api.put<{ data: Note }>(API_ENDPOINTS.noteById(id), input);
  return response.data.data;
}

export async function deleteNote(id: string): Promise<void> {
  await api.delete(API_ENDPOINTS.noteById(id));
}
