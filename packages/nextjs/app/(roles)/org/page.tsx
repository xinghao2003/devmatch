"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, Globe, Package, Plus, TrendingUp, Users } from "lucide-react";
import { useShipmentData } from "~~/hooks/scaffold-eth";

const OrgDashboard: React.FC = () => {
    // Real blockchain data
  const {
    shipments,
    totalShipments,
    loading,
    error,
    getStatusLabel
  } = useShipmentData();

  // Calculate stats from real data
  const totalShipmentsCount = Number(totalShipments || 0);
  const activeShipments = shipments.filter(s => s.status === 0 || s.status === 1).length;
  const deliveredShipments = shipments.filter(s => s.status === 2).length;
  const countriesReached = new Set(shipments.map(s => s.destination.split(',')[1]?.trim() || 'Unknown')).size;

  const stats = [
    { name: "Total Shipments", value: totalShipmentsCount.toString(), icon: Package, color: "bg-blue-500", change: "Live" },
    { name: "Active Shipments", value: activeShipments.toString(), icon: TrendingUp, color: "bg-green-500", change: "Live" },
    { name: "Team Members", value: "1", icon: Users, color: "bg-purple-500", change: "Fixed" },
    { name: "Countries Reached", value: countriesReached.toString(), icon: Globe, color: "bg-cyan-500", change: "Live" },
  ];

  // Get recent shipments (last 3)
  const recentShipments = shipments
    .slice(-3)
    .reverse()
    .map(shipment => ({
      id: `#${shipment.id}`,
      destination: shipment.destination,
      status: getStatusLabel(shipment.status),
      value: "$0", // Not tracked in MVP
    }));

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded mb-2"></div>
            <div className="h-4 bg-white/10 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 animate-pulse">
              <div className="h-4 bg-white/10 rounded mb-2"></div>
              <div className="h-8 bg-white/10 rounded mb-2"></div>
              <div className="h-3 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20">
          <h1 className="text-3xl font-bold text-red-400 mb-2">Error Loading Dashboard</h1>
          <p className="text-red-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-white mb-2">Organization Dashboard</h1>
          <p className="text-white/70">Manage your humanitarian aid operations</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70">{stat.name}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-green-400">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Recent Shipments</h3>
                <Link href="/org/shipments" className="text-blue-400 hover:text-blue-300 text-sm">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {recentShipments.map(shipment => (
                  <div key={shipment.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{shipment.id}</p>
                        <p className="text-sm text-white/60">To {shipment.destination}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">{shipment.value}</p>
                      <p
                        className={`text-sm ${
                          shipment.status === "Delivered"
                            ? "text-green-400"
                            : shipment.status === "In Transit"
                              ? "text-blue-400"
                              : "text-yellow-400"
                        }`}
                      >
                        {shipment.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/org/create" className="block">
                  <div className="flex items-center p-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl transition-colors">
                    <Plus className="h-5 w-5 text-blue-400 mr-3" />
                    <span className="text-white">Create New Shipment</span>
                  </div>
                </Link>
                <Link href="/org/analytics" className="block">
                  <div className="flex items-center p-3 bg-green-500/20 hover:bg-green-500/30 rounded-xl transition-colors">
                    <BarChart3 className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-white">View Analytics</span>
                  </div>
                </Link>
                <Link href="/org/team" className="block">
                  <div className="flex items-center p-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl transition-colors">
                    <Users className="h-5 w-5 text-purple-400 mr-3" />
                    <span className="text-white">Manage Team</span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Live Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Shipments Created</span>
                  <span className="text-white font-medium">{totalShipmentsCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Delivered</span>
                  <span className="text-white font-medium">{deliveredShipments}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Delivery Rate</span>
                  <span className="text-green-400 font-medium">
                    {totalShipmentsCount > 0 ? Math.round((deliveredShipments / totalShipmentsCount) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrgDashboard;
