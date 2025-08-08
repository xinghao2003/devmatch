"use client";

import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export type UserRole = "public" | "field" | "org" | "admin";

export interface User {
  address: string;
  role: UserRole;
  name?: string;
  organization?: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (address: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  hasPermission: (permission: string) => boolean;
  getDefaultPath: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user database - in production, this would be fetched from blockchain/backend
  const mockUsers: Record<string, Omit<User, "address">> = {
    // Admin wallet
    "0xab3243233c27b49066e89ae1ef6d2cba024ee37c": {
      role: "admin",
      name: "System Admin",
      organization: "AidChain Platform",
      permissions: ["read", "write", "admin", "manage_users", "system_config"],
    },
    // NGO wallet
    "0x892d35cc6634c0532925a3b844bc9e7595f0beb8": {
      role: "org",
      name: "NGO Coordinator",
      organization: "Red Cross International",
      permissions: ["read", "write", "create_shipments", "manage_team"],
    },
    // Field worker wallet
    "0x992d35cc6634c0532925a3b844bc9e7595f0beb9": {
      role: "field",
      name: "Field Worker",
      organization: "Red Cross International",
      permissions: ["read", "scan", "checkpoint", "delivery"],
    },
  };

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem("aidchain_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("aidchain_user");
      }
    } else {
      // Set default public user for anonymous access
      setUser({
        address: "anonymous",
        role: "public",
        permissions: ["read"],
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (address: string, role?: UserRole) => {
    setIsLoading(true);
    try {
      const normalizedAddress = address.toLowerCase();
      const userData = mockUsers[normalizedAddress];

      if (userData || role === "public") {
        const newUser: User = {
          address: normalizedAddress,
          role: role || userData?.role || "public",
          name: userData?.name,
          organization: userData?.organization,
          permissions: userData?.permissions || ["read"],
        };

        setUser(newUser);

        // Don't store public users
        if (newUser.role !== "public") {
          localStorage.setItem("aidchain_user", JSON.stringify(newUser));
        }

        toast.success(`Welcome${newUser.name ? `, ${newUser.name}` : ""}!`);
      } else {
        // Default to public role for unregistered addresses
        const publicUser: User = {
          address: normalizedAddress,
          role: "public",
          permissions: ["read"],
        };
        setUser(publicUser);
        toast.success("Connected as public user");
      }
    } catch (error) {
      toast.error("Failed to authenticate user");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("aidchain_user");
    toast.success("Logged out successfully");
  };

  const switchRole = (role: UserRole) => {
    if (!user) return;

    // Allow switching to public from any role
    if (role === "public") {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      return;
    }

    // For other roles, check if user has access
    const userData = mockUsers[user.address];
    if (userData && userData.role === role) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem("aidchain_user", JSON.stringify(updatedUser));
    } else {
      toast.error("Access denied for this role");
    }
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const getDefaultPath = (): string => {
    if (!user) return "/public";

    switch (user.role) {
      case "admin":
        return "/admin";
      case "org":
        return "/org";
      case "field":
        return "/field";
      default:
        return "/public";
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && user.role !== "public",
    isLoading,
    login,
    logout,
    switchRole,
    hasPermission,
    getDefaultPath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
