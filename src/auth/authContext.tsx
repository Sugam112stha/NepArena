import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (data: { fullName: string; username: string; email: string; pass: string }) => Promise<void>;
  socialLogin: (provider: "google" | "discord") => void;
  completeSocialLogin: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const apiUrl = `${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api`;

interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

const requestAuth = async (path: string, body: Record<string, string>) => {
  let response: Response;
  try {
    response = await fetch(`${apiUrl}/auth/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Unable to reach the server. Make sure the backend is running.");
  }

  const result = (await response.json().catch(() => ({}))) as AuthResponse;

  if (!response.ok || !result.user || !result.token) {
    throw new Error(result.message || "Authentication request failed");
  }

  return result;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("neparena_user");
    const token = localStorage.getItem("neparena_token");
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("neparena_user");
        localStorage.removeItem("neparena_token");
      }
    }
  }, []);

  const login = async (email: string, pass: string) => {
    const result = await requestAuth("login", { email, password: pass });
    setUser(result.user!);
    localStorage.setItem("neparena_user", JSON.stringify(result.user));
    localStorage.setItem("neparena_token", result.token!);
  };

  const signup = async ({ fullName, username, email, pass }: { fullName: string; username: string; email: string; pass: string }) => {
    const result = await requestAuth("signup", {
      fullName,
      username,
      email,
      password: pass,
    });
    setUser(result.user!);
    localStorage.setItem("neparena_user", JSON.stringify(result.user));
    localStorage.setItem("neparena_token", result.token!);
  };

  const socialLogin = (provider: "google" | "discord") => {
    window.location.assign(`${apiUrl}/auth/${provider}`);
  };

  const completeSocialLogin = (token: string, socialUser: User) => {
    setUser(socialUser);
    localStorage.setItem("neparena_user", JSON.stringify(socialUser));
    localStorage.setItem("neparena_token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("neparena_user");
    localStorage.removeItem("neparena_token");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, socialLogin, completeSocialLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};