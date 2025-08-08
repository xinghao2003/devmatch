"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, MapPin, Package, QrCode } from "lucide-react";

const FieldDashboard: React.FC = () => {
  const stats = [
    { name: "Today's Scans", value: "24", icon: QrCode, color: "bg-blue-500" },
    { name: "Active Shipments", value: "8", icon: Package, color: "bg-green-500" },
    { name: "Pending Deliveries", value: "3", icon: Clock, color: "bg-yellow-500" },
    { name: "Completed", value: "12", icon: CheckCircle, color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-white mb-2">Field Dashboard</h1>
          <p className="text-white/70">Manage shipments and track deliveries in the field</p>
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
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white/70">{stat.name}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl transition-colors text-white">
                <div className="flex items-center">
                  <QrCode className="h-5 w-5 mr-3" />
                  <span>Scan Shipment</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-green-500/20 hover:bg-green-500/30 rounded-xl transition-colors text-white">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>Log Checkpoint</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl transition-colors text-white">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3" />
                  <span>Mark Delivered</span>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: "Scanned shipment SHP-001", time: "2 minutes ago" },
                { action: "Checkpoint logged for SHP-002", time: "15 minutes ago" },
                { action: "Delivered SHP-003", time: "1 hour ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-xs text-white/60">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FieldDashboard;
