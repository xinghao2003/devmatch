"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, Globe, Package, Plus, TrendingUp, Users } from "lucide-react";

const OrgDashboard: React.FC = () => {
  const stats = [
    { name: "Total Shipments", value: "156", icon: Package, color: "bg-blue-500", change: "+12%" },
    { name: "Active Shipments", value: "23", icon: TrendingUp, color: "bg-green-500", change: "+5%" },
    { name: "Team Members", value: "12", icon: Users, color: "bg-purple-500", change: "+2" },
    { name: "Countries Reached", value: "8", icon: Globe, color: "bg-cyan-500", change: "+1" },
  ];

  const recentShipments = [
    { id: "SHP-156", destination: "Haiti", status: "In Transit", value: "$45,000" },
    { id: "SHP-155", destination: "Bangladesh", status: "Delivered", value: "$32,000" },
    { id: "SHP-154", destination: "Kenya", status: "Processing", value: "$18,500" },
  ];

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
              <h3 className="text-lg font-semibold text-white mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Shipments Created</span>
                  <span className="text-white font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Total Value</span>
                  <span className="text-white font-medium">$234K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Delivery Rate</span>
                  <span className="text-green-400 font-medium">94.2%</span>
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
