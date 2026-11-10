export type Role = "user" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  interests: string[];
  createdAt: string;
  updatedAt: string;
};

export type Note = {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type InterestGroup = {
  _id: string;
  userCount: number;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ListResponse<T> = {
  success: boolean;
  data: T[];
  pagination: Pagination;
};
