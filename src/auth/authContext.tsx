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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("neparena_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("neparena_user");
      }
    }
  }, []);

  const login = async (email: string) => {
    // Replace with your API endpoint / Firebase / Supabase call
    const mockUser: User = {
      id: "usr_" + Date.now(),
      fullName: email.split("@")[0],
      username: email.split("@")[0].toLowerCase(),
      email,
    };
    setUser(mockUser);
    localStorage.setItem("neparena_user", JSON.stringify(mockUser));
  };

  const signup = async ({ fullName, username, email }: { fullName: string; username: string; email: string }) => {
    // Replace with your backend registration API endpoint
    const newUser: User = {
      id: "usr_" + Date.now(),
      fullName,
      username,
      email,
    };
    setUser(newUser);
    localStorage.setItem("neparena_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("neparena_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout }}>
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