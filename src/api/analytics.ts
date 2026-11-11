import { api } from "./client";
import { API_CONFIG, API_ENDPOINTS } from "../constants";
import type { InterestGroup, ListResponse } from "../types";

export async function listInterests(page: number): Promise<ListResponse<InterestGroup>> {
  const response = await api.get<ListResponse<InterestGroup>>(API_ENDPOINTS.ADMIN_ANALYTICS_INTERESTS, {
    params: { page, limit: API_CONFIG.PAGE_SIZE },
  });
  return response.data;
}
