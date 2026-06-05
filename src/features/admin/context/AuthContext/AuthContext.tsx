"use client";

import { createContext, useContext, useState,  ReactNode } from "react";
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bloodGroup?: string;
  role: "admin" | "moderator" | "member";
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // initialize state from localStorage to avoid synchronous setState inside useEffect
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem("token");
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? (JSON.parse(storedUser) as User) : null;
    } catch (error) {
      console.error("ইউজার ডাটা পার্স করতে সমস্যা হয়েছে:", error);
      return null;
    }
  });

  // no loading needed because state is initialized synchronously from localStorage
  const [loading] = useState<boolean>(false);

  const login = (newToken: string, userData: User) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}