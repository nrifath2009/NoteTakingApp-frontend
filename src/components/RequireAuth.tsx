import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function RequireAuth() {
  const { user, loading } = useAuth();
  if (loading) return <p className="status">Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function RequireAdmin() {
  const { user, loading } = useAuth();
  if (loading) return <p className="status">Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/notes" replace />;
  return <Outlet />;
}
