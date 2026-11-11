export const USER_ROLE = {
  USER: "user",
  ADMIN: "admin",
} as const;

export type Role = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
} as const;

export const API_CONFIG = {
  DEFAULT_BASE_URL: "https://notetakingapp-backend-production.up.railway.app/api",
  PAGE_SIZE: 10,
} as const;

export const APP_NAME = "Secure Notes";

export const API_ENDPOINTS = {
  AUTH_REGISTER: "/auth/register",
  AUTH_LOGIN: "/auth/login",
  AUTH_ME: "/auth/me",
  AUTH_CHANGE_PASSWORD: "/auth/change-password",
  NOTES: "/notes",
  ADMIN_NOTES: "/admin/notes",
  ADMIN_USERS: "/admin/users",
  ADMIN_ANALYTICS_INTERESTS: "/admin/analytics/interests",
  noteById: (id: string) => `/notes/${id}`,
  adminUserById: (id: string) => `/admin/users/${id}`,
} as const;