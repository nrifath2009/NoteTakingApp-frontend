import { api } from "./client";
import type { InterestGroup, ListResponse } from "../types";

export async function listInterests(page: number): Promise<ListResponse<InterestGroup>> {
  const response = await api.get<ListResponse<InterestGroup>>("/admin/analytics/interests", {
    params: { page, limit: 10 },
  });
  return response.data;
}
