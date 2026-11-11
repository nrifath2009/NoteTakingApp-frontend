import { Navigate, Outlet } from "react-router-dom";
import { USER_ROLE } from "../constants";
import { useAuth } from "../context/useAuth";
import { ROUTES } from "../routes";

export function RequireAuth() {
  const { user, loading } = useAuth();
  if (loading) return <p className="status">Loading...</p>;
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;
  return <Outlet />;
}

export function RequireAdmin() {
  const { user, loading } = useAuth();
  if (loading) return <p className="status">Loading...</p>;
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;
  if (user.role !== USER_ROLE.ADMIN)
    return <Navigate to={ROUTES.NOTES} replace />;
  return <Outlet />;
}
