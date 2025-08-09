"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, MapPin, Package, QrCode } from "lucide-react";
import { useShipmentData } from "~~/hooks/scaffold-eth";

const FieldDashboard: React.FC = () => {
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
  const pendingDeliveries = shipments.filter(s => s.status === 1).length;
  const completedShipments = shipments.filter(s => s.status === 2).length;

  const stats = [
    { name: "Total Shipments", value: totalShipmentsCount.toString(), icon: QrCode, color: "bg-blue-500" },
    { name: "Active Shipments", value: activeShipments.toString(), icon: Package, color: "bg-green-500" },
    { name: "Pending Deliveries", value: pendingDeliveries.toString(), icon: Clock, color: "bg-yellow-500" },
    { name: "Completed", value: completedShipments.toString(), icon: CheckCircle, color: "bg-emerald-500" },
  ];

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
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                <div className="ml-4">
                  <div className="h-4 bg-white/10 rounded mb-2"></div>
                  <div className="h-8 bg-white/10 rounded"></div>
                </div>
              </div>
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
          <h1 className="text-2xl font-bold text-red-400 mb-2">Error Loading Dashboard</h1>
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
              <a href="/field/scan" className="w-full flex items-center justify-between p-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl transition-colors text-white">
                <div className="flex items-center">
                  <QrCode className="h-5 w-5 mr-3" />
                  <span>Scan Shipment</span>
                </div>
              </a>
              <a href="/field/checkpoint" className="w-full flex items-center justify-between p-3 bg-green-500/20 hover:bg-green-500/30 rounded-xl transition-colors text-white">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>Log Checkpoint</span>
                </div>
              </a>
              <a href="/field/delivery" className="w-full flex items-center justify-between p-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl transition-colors text-white">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3" />
                  <span>Mark Delivered</span>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Shipments</h3>
            <div className="space-y-3">
              {shipments.slice(-3).reverse().map((shipment) => (
                <div key={shipment.id} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                    shipment.status === 2 ? 'bg-green-400' : 
                    shipment.status === 1 ? 'bg-yellow-400' : 'bg-blue-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Shipment #{shipment.id} - {getStatusLabel(shipment.status)}</p>
                    <p className="text-xs text-white/60">{shipment.description}</p>
                  </div>
                </div>
              ))}
              {shipments.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-white/60">No shipments found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FieldDashboard;
