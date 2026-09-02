import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function ProtectedRoute() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to /login, saving current path so we can return after logging in
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}