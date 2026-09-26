import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function ProtectedRoute() {
  const { isLoggedIn, isAuthLoading } = useAuth();
  const location = useLocation();

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-sm font-semibold text-gray-400">
        Restoring your session...
      </div>
    );
  }

  if (!isLoggedIn) {
    // Redirect to /login, saving current path so we can return after logging in
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}