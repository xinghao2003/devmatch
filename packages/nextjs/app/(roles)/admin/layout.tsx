"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BarChart3, Building2, FileText, Home, Menu, Settings, Shield, Users, X } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Organizations", href: "/admin/organizations", icon: Building2 },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "System", href: "/admin/system", icon: Activity },
    { name: "Security", href: "/admin/security", icon: Shield },
    { name: "Audit", href: "/admin/audit", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/admin" && pathname === "/admin") return true;
    return pathname.startsWith(path) && path !== "/admin";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-gray-800/50 lg:backdrop-blur-xl">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h2 className="text-xl font-semibold text-white">Admin Panel</h2>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive(item.href)
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile header */}
        <div className="lg:hidden bg-gray-800/50 backdrop-blur-xl">
          <div className="flex items-center justify-between h-16 px-4">
            <h2 className="text-lg font-semibold text-white">Admin Panel</h2>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-gray-300">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/25" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800/50 backdrop-blur-xl">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map(item => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                        isActive(item.href)
                          ? "bg-gray-700 text-white"
                          : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                      }`}
                    >
                      <Icon className="mr-4 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
