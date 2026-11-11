import { APP_NAME } from "./constants";
import { ROUTES, ROUTE_PATTERNS } from "./routes";

export interface Crumb {
  label: string;
  to?: string;
}

export function crumbsFor(pathname: string): Crumb[] {
  if (pathname === ROUTES.NOTES) return [{ label: "Notes" }];
  if (pathname === ROUTES.NEW_NOTE) return [{ to: ROUTES.NOTES, label: "Notes" }, { label: "New note" }];
  if (ROUTE_PATTERNS.EDIT_NOTE.test(pathname)) {
    return [{ to: ROUTES.NOTES, label: "Notes" }, { label: "Edit note" }];
  }
  if (pathname === ROUTES.ACCOUNT) return [{ label: "Profile" }];
  if (pathname === ROUTES.ADMIN_USERS) return [{ label: "Users" }];
  if (pathname === ROUTES.NEW_ADMIN_USER) {
    return [{ to: ROUTES.ADMIN_USERS, label: "Users" }, { label: "New user" }];
  }
  if (ROUTE_PATTERNS.EDIT_ADMIN_USER.test(pathname)) {
    return [{ to: ROUTES.ADMIN_USERS, label: "Users" }, { label: "Edit user" }];
  }
  if (pathname === ROUTES.ADMIN_NOTES) return [{ label: "All notes" }];
  if (pathname === ROUTES.ADMIN_ANALYTICS) return [{ label: "Interests" }];
  return [];
}

export function pageTitle(pathname: string): string {
  if (pathname === ROUTES.LOGIN) return `Log in · ${APP_NAME}`;
  if (pathname === ROUTES.REGISTER) return `Register · ${APP_NAME}`;
  const current = crumbsFor(pathname).at(-1)?.label;
  return current ? `${current} · ${APP_NAME}` : APP_NAME;
}
