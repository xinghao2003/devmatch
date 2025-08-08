"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Home, Menu, Package, Plus, Settings, Users, X } from "lucide-react";

interface OrgLayoutProps {
  children: ReactNode;
}

const OrgLayout: React.FC<OrgLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/org", icon: Home },
    { name: "Shipments", href: "/org/shipments", icon: Package },
    { name: "Create Shipment", href: "/org/create", icon: Plus },
    { name: "Team", href: "/org/team", icon: Users },
    { name: "Analytics", href: "/org/analytics", icon: BarChart3 },
    { name: "Reports", href: "/org/reports", icon: FileText },
    { name: "Settings", href: "/org/settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/org" && pathname === "/org") return true;
    return pathname.startsWith(path) && path !== "/org";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-800">
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white/10 lg:backdrop-blur-xl">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h2 className="text-xl font-semibold text-white">Organization</h2>
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
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
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
        <div className="lg:hidden bg-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between h-16 px-4">
            <h2 className="text-lg font-semibold text-white">Organization</h2>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-white">
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
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white/10 backdrop-blur-xl">
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
                          ? "bg-white/20 text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
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

export default OrgLayout;
