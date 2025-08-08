"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, Building2, CheckCircle, Clock, Package, Users } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const stats = [
    { name: "Total Users", value: "2,847", icon: Users, color: "bg-blue-500", change: "+12.3%" },
    { name: "Organizations", value: "124", icon: Building2, color: "bg-green-500", change: "+8.1%" },
    { name: "Total Shipments", value: "15,429", icon: Package, color: "bg-purple-500", change: "+18.2%" },
    { name: "System Health", value: "99.9%", icon: Activity, color: "bg-emerald-500", change: "Stable" },
  ];

  const systemAlerts = [
    { type: "warning", message: "High API usage detected on Oasis network", time: "2 minutes ago" },
    { type: "success", message: "Backup completed successfully", time: "1 hour ago" },
    { type: "info", message: "New organization registration: Red Cross Kenya", time: "3 hours ago" },
  ];

  const recentActivity = [
    { action: "User registration", user: "0x742d...ee37c", time: "5 minutes ago" },
    { action: "Shipment created", user: "Red Cross International", time: "12 minutes ago" },
    { action: "Organization approved", user: "UNICEF Bangladesh", time: "1 hour ago" },
    { action: "System backup", user: "System", time: "2 hours ago" },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">System overview and management console</p>
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
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-green-400">{stat.change}</p>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Alerts */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">System Alerts</h3>
                <span className="text-sm text-gray-400">{systemAlerts.length} active</span>
              </div>
              <div className="space-y-4">
                {systemAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-700/30 rounded-xl">
                    <div
                      className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                        alert.type === "warning"
                          ? "bg-yellow-400"
                          : alert.type === "success"
                            ? "bg-green-400"
                            : "bg-blue-400"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{alert.message}</p>
                      <p className="text-gray-400 text-xs mt-1">{alert.time}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {alert.type === "warning" ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      ) : alert.type === "success" ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-xs">{activity.user}</p>
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Oasis Sapphire Network", status: "Operational", uptime: "99.99%" },
              { name: "IPFS Storage", status: "Operational", uptime: "99.95%" },
              { name: "API Services", status: "Operational", uptime: "99.98%" },
            ].map(service => (
              <div key={service.name} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-medium text-white">{service.name}</h4>
                <p className="text-green-400 text-sm">{service.status}</p>
                <p className="text-gray-400 text-xs">Uptime: {service.uptime}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
