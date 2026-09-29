import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { completeSocialLogin } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.hash.slice(1) || location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login?oauthError=Social login failed", { replace: true });
      return;
    }
    window.history.replaceState(null, "", `${location.pathname}${location.search}`);

    let isActive = true;
    const finishSocialLogin = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json() as { user?: Parameters<typeof completeSocialLogin>[1]; message?: string };
        if (!response.ok || !result.user) throw new Error(result.message || "Unable to load your account.");
        if (!isActive) return;
        completeSocialLogin(token, result.user);
        navigate("/", { replace: true });
      } catch (error) {
        if (!isActive) return;
        const message = error instanceof Error ? error.message : "Social login failed.";
        navigate(`/login?oauthError=${encodeURIComponent(message)}`, { replace: true });
      }
    };
    void finishSocialLogin();
    return () => { isActive = false; };
  }, [completeSocialLogin, location.hash, location.search, navigate]);

  return <main className="flex min-h-screen items-center justify-center bg-[#050505] text-sm text-white">Signing you in...</main>;
};

export default AuthCallback;