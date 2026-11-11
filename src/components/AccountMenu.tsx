import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { ROUTES } from "../routes";

export function AccountMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="account" ref={rootRef}>
      <button
        type="button"
        className="account-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{user?.name}</span>
        <span className="account-caret" aria-hidden="true">
          ▾
        </span>
      </button>
      {open ? (
        <div className="account-menu" role="menu">
          <p className="role-badge">{user?.role}</p>
          <NavLink
            to={ROUTES.ACCOUNT}
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            Profile
          </NavLink>
          <button type="button" role="menuitem" onClick={logout}>
            Log out
          </button>
        </div>
      ) : null}
    </div>
  );
}
