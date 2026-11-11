export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  NOTES: "/notes",
  NEW_NOTE: "/notes/new",
  EDIT_NOTE: "/notes/:id/edit",
  ACCOUNT: "/account",
  ACCOUNT_PASSWORD: "/account/password",
  ADMIN_USERS: "/admin/users",
  NEW_ADMIN_USER: "/admin/users/new",
  EDIT_ADMIN_USER: "/admin/users/:id/edit",
  ADMIN_NOTES: "/admin/notes",
  ADMIN_ANALYTICS: "/admin/analytics",
  NOT_FOUND: "*",
} as const;

export const routeHref = {
  editAdminUser: (id: string) => ROUTES.EDIT_ADMIN_USER.replace(":id", id),
} as const;

export const ROUTE_PATTERNS = {
  EDIT_NOTE: /^\/notes\/[^/]+\/edit$/,
  EDIT_ADMIN_USER: /^\/admin\/users\/[^/]+\/edit$/,
} as const;