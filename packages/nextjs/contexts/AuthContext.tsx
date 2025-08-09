"use client";

import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

export type UserRole = "public" | "field" | "org";

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

  // Hardcoded roles (must mirror ShipmentTracker.sol)
  const ORG_WALLET = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8".toLowerCase();
  const FIELD_WALLET = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC".toLowerCase();

  const { address } = useAccount();

  useEffect(() => {
    // Check for stored authentication
    // Default to public
    setUser({ address: "anonymous", role: "public", permissions: ["read"] });
    setIsLoading(false);
  }, []);

  // Auto-assign role based on connected wallet
  useEffect(() => {
    if (!address) return;
    const addr = address.toLowerCase();
    let role: UserRole = "public";
    let permissions: string[] = ["read"];

    if (addr === ORG_WALLET) {
      role = "org";
      permissions = ["read", "write", "create_shipments"];
    } else if (addr === FIELD_WALLET) {
      role = "field";
      permissions = ["read", "scan", "checkpoint", "delivery"];
    }

    const newUser: User = { address: addr, role, permissions };
    setUser(newUser);
    if (role !== "public") localStorage.setItem("aidchain_user", JSON.stringify(newUser));
  }, [address]);

  const login = async (inputAddress: string, role?: UserRole) => {
    setIsLoading(true);
    try {
      const normalizedAddress = inputAddress.toLowerCase();
      let computedRole: UserRole = "public";
      let permissions: string[] = ["read"];
      if (normalizedAddress === ORG_WALLET) {
        computedRole = "org";
        permissions = ["read", "write", "create_shipments"];
      } else if (normalizedAddress === FIELD_WALLET) {
        computedRole = "field";
        permissions = ["read", "scan", "checkpoint", "delivery"];
      }

      const newUser: User = { address: normalizedAddress, role: role || computedRole, permissions };
      setUser(newUser);
      if (newUser.role !== "public") localStorage.setItem("aidchain_user", JSON.stringify(newUser));
      toast.success("Wallet connected");
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
    const updatedUser = { ...user, role };
    setUser(updatedUser);
    if (role !== "public") localStorage.setItem("aidchain_user", JSON.stringify(updatedUser));
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const getDefaultPath = (): string => {
    if (!user) return "/public";

    switch (user.role) {
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
