import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { APP_NAME, USER_ROLE } from "../constants";
import { crumbsFor, pageTitle } from "../navigation";
import { ROUTES } from "../routes";
import { AccountMenu } from "./AccountMenu";

export function Layout() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const crumbs = crumbsFor(pathname);
  const admin = user?.role === USER_ROLE.ADMIN;

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
          <Link to={ROUTES.NOTES} className="brand">
            {APP_NAME}
          </Link>
          <nav aria-label="Primary">
            <NavLink to={ROUTES.NOTES}>Notes</NavLink>
          </nav>
          {admin ? (
            <nav className="nav-admin" aria-label="Administration">
              <span className="nav-label">Admin</span>
              <NavLink to={ROUTES.ADMIN_USERS}>Users</NavLink>
              <NavLink to={ROUTES.ADMIN_NOTES}>All notes</NavLink>
              <NavLink to={ROUTES.ADMIN_ANALYTICS}>Interests</NavLink>
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
        <Link to={ROUTES.LOGIN} className="brand">
          {APP_NAME}
        </Link>
      </header>
      <main id="content">
        <Outlet />
      </main>
    </div>
  );
}
