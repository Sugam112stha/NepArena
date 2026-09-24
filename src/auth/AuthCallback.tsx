import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import type { User } from "./authContext";

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { completeSocialLogin } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const encodedUser = params.get("user");

    if (!token || !encodedUser) {
      navigate("/login?oauthError=Social login failed", { replace: true });
      return;
    }

    try {
      completeSocialLogin(token, JSON.parse(encodedUser) as User);
      navigate("/", { replace: true });
    } catch {
      navigate("/login?oauthError=Social login failed", { replace: true });
    }
  }, [completeSocialLogin, location.search, navigate]);

  return <main className="flex min-h-screen items-center justify-center bg-[#050505] text-sm text-white">Signing you in...</main>;
};

export default AuthCallback;