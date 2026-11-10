import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { crumbsFor, pageTitle } from "../navigation";
import { AccountMenu } from "./AccountMenu";

export function Layout() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const crumbs = crumbsFor(pathname);
  const admin = user?.role === "admin";

  useEffect(() => {
    document.title = pageTitle(pathname);
  }, [pathname]);

  return (
    <div className="shell">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="topbar">
        <div className="topbar-start">
          <Link to="/notes" className="brand">
            Secure Notes
          </Link>
          <nav aria-label="Primary">
            <NavLink to="/notes">Notes</NavLink>
          </nav>
          {admin ? (
            <nav className="nav-admin" aria-label="Administration">
              <span className="nav-label">Admin</span>
              <NavLink to="/admin/users">Users</NavLink>
              <NavLink to="/admin/notes">All notes</NavLink>
              <NavLink to="/admin/analytics">Interests</NavLink>
            </nav>
          ) : null}
        </div>
        <AccountMenu />
      </header>
      <main id="content">
        {crumbs.length > 1 ? (
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              {crumbs.map((crumb, index) => {
                const last = index === crumbs.length - 1;
                return (
                  <li key={crumb.label}>
                    {last || !crumb.to ? (
                      <span aria-current="page">{crumb.label}</span>
                    ) : (
                      <Link to={crumb.to}>{crumb.label}</Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}
        <Outlet />
      </main>
    </div>
  );
}

export function AuthLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = pageTitle(pathname);
  }, [pathname]);

  return (
    <div className="shell">
      <header className="topbar">
        <Link to="/login" className="brand">
          Secure Notes
        </Link>
      </header>
      <main id="content">
        <Outlet />
      </main>
    </div>
  );
}
