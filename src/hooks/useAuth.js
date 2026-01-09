"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  loginAdmin,
  logoutAdmin,
  verifyAdminSession,
} from "@/app/dashboard/actions/auth.action";

export function useAuth() {
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
      return { success: false, error: result.error };
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

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    getAdminName,
    admin,
    refreshAuth: checkAuth,
  };
}
