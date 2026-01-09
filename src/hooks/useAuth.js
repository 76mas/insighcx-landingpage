"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import {
  loginAdmin,
  logoutAdmin,
  verifyAdminSession,
} from "@/app/dashboard/actions/auth.action";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const result = await verifyAdminSession();
      if (result.success && result.authenticated) {
        setIsAuthenticated(true);
        setAdmin(result.admin);
      } else {
        setIsAuthenticated(false);
        setAdmin(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const result = await loginAdmin(username, password);
      if (result.success) {
        setIsAuthenticated(true);
        setAdmin(result.admin);
        return { success: true };
      }
      return { success: false, error: result.error || "Login failed" };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const logout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
    setAdmin(null);
    router.push("/dashboard/login");
  };

  const getAdminName = () => {
    return admin?.name || "Admin";
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    getAdminName,
    admin,
    refreshAuth: checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
