"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";
import { useWeb3 } from "../../../contexts/Web3Context";
import { motion } from "framer-motion";
import { ExternalLink, Globe, Heart, Info, Menu, Package, Search, Shield, TrendingUp, Users, X } from "lucide-react";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { user, login, logout } = useAuth();
  const { connectWallet, isConnecting } = useWeb3();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Track Shipment", href: "/public", icon: Search },
    { name: "Browse Shipments", href: "/public/browse", icon: Package },
    { name: "About Platform", href: "/public/about", icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === "/public" && pathname === "/public") return true;
    return pathname.startsWith(path) && path !== "/public";
  };

  const handleAuthenticate = async () => {
    const address = await connectWallet();
    if (address) {
      await login(address);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="min-h-screen backdrop-blur-3xl bg-black/10">
        {/* Header */}
        <header className="glass border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/public" className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">TraceAid</h1>
                    <p className="text-xs text-white/60">Transparent Relief Tracking</p>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {navigation.map(item => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 ${isActive(item.href)
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Auth & Mobile Menu */}
              <div className="flex items-center space-x-4">
                {!user || user.address === "anonymous" ? (
                  <button
                    onClick={handleAuthenticate}
                    disabled={isConnecting}
                    className="glass-button flex items-center space-x-2 text-white"
                  >
                    <Shield className="h-4 w-4" />
                    <span className="hidden sm:inline">{isConnecting ? "Connecting..." : "Sign In"}</span>
                  </button>
                ) : (
                  <div className="relative group">
                    <button className="glass-button flex items-center space-x-2 text-white">
                      <Users className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        {user.address.slice(0, 6)}...{user.address.slice(-4)}
                      </span>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-black/80 backdrop-blur-lg border border-white/20 rounded-2xl p-3 shadow-2xl">
                        <div className="px-3 py-2 border-b border-white/10 mb-2">
                          <div className="text-sm font-medium text-white">{user.name || "User"}</div>
                          <div className="text-xs text-white/60">{user.organization || "N/A"}</div>
                          <div className="text-xs text-white/50 mt-1">
                            Role: <span className="capitalize text-blue-400">{user.role}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Link
                            href={user.role === "admin" ? "/admin" : user.role === "org" ? "/org" : "/field"}
                            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                          >
                            <Users className="h-4 w-4" />
                            <span>Go to Dashboard</span>
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-500/20 text-white/80 hover:text-red-300 transition-colors"
                          >
                            <Shield className="h-4 w-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg glass text-white"
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden border-t border-white/10"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map(item => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-xl transition-all duration-300 ${isActive(item.href)
                          ? "bg-white/20 text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </header>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center py-3 space-x-6 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span>Blockchain Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-green-400" />
                <span>Fully Transparent</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-purple-400" />
                <span>Real-time Tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {children}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="glass border-t border-white/10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">TraceAid</h3>
                    <p className="text-xs text-white/60">Transparent Relief Tracking</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm mb-4">
                  Bringing transparency and accountability to humanitarian aid through blockchain technology. Every
                  package tracked, every delivery verified.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Platform</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/public/about" className="text-white/60 hover:text-white">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/public/browse" className="text-white/60 hover:text-white">
                      Browse Shipments
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://explorer.oasis.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white flex items-center"
                    >
                      Blockchain Explorer
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Trust & Security</h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-white/60">Powered by Oasis Sapphire</li>
                  <li className="text-white/60">IPFS Distributed Storage</li>
                  <li className="text-white/60">Immutable Tracking</li>
                  <li className="text-white/60">Open Source</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-white/60">© 2024 TraceAid. Built for transparency in humanitarian aid.</div>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <Globe className="h-4 w-4" />
                <span>Powered by Oasis Network</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PublicLayout;
