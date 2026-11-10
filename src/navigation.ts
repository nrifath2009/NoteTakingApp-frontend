export interface Crumb {
  label: string;
  to?: string;
}

export function crumbsFor(pathname: string): Crumb[] {
  if (pathname === "/notes") return [{ label: "Notes" }];
  if (pathname === "/notes/new") return [{ to: "/notes", label: "Notes" }, { label: "New note" }];
  if (/^\/notes\/[^/]+\/edit$/.test(pathname)) {
    return [{ to: "/notes", label: "Notes" }, { label: "Edit note" }];
  }
  if (pathname === "/account") return [{ label: "Profile" }];
  if (pathname === "/admin/users") return [{ label: "Users" }];
  if (pathname === "/admin/users/new") {
    return [{ to: "/admin/users", label: "Users" }, { label: "New user" }];
  }
  if (/^\/admin\/users\/[^/]+\/edit$/.test(pathname)) {
    return [{ to: "/admin/users", label: "Users" }, { label: "Edit user" }];
  }
  if (pathname === "/admin/notes") return [{ label: "All notes" }];
  if (pathname === "/admin/analytics") return [{ label: "Interests" }];
  return [];
}

export function pageTitle(pathname: string): string {
  if (pathname === "/login") return "Log in · Secure Notes";
  if (pathname === "/register") return "Register · Secure Notes";
  const current = crumbsFor(pathname).at(-1)?.label;
  return current ? `${current} · Secure Notes` : "Secure Notes";
}
