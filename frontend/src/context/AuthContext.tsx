import React, { createContext, useContext, useState } from "react";
import { UserRole } from "../types";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  loginAsStudent: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  loginAsStudent: () => {},
  loginAsAdmin: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("is_auth") === "true";
  });
  const [userRole, setUserRole] = useState<UserRole | null>(() => {
    return (localStorage.getItem("user_role") as UserRole) || null;
  });

  const loginAsStudent = () => {
    setIsAuthenticated(true);
    setUserRole("student");
    localStorage.setItem("is_auth", "true");
    localStorage.setItem("user_role", "student");
  };

  const loginAsAdmin = () => {
    setIsAuthenticated(true);
    setUserRole("admin");
    localStorage.setItem("is_auth", "true");
    localStorage.setItem("user_role", "admin");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("is_auth");
    localStorage.removeItem("user_role");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, loginAsStudent, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
