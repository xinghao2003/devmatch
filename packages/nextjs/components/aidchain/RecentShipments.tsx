"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Package } from "lucide-react";

const RecentShipments: React.FC = () => {
  const recentShipments = [
    {
      id: "SHP-001",
      description: "Medical Supplies",
      destination: "Haiti",
      status: "in-transit",
      time: "2 hours ago",
    },
    {
      id: "SHP-002",
      description: "Food & Water",
      destination: "Bangladesh",
      status: "delivered",
      time: "5 hours ago",
    },
    {
      id: "SHP-003",
      description: "Shelter Materials",
      destination: "Turkey",
      status: "delayed",
      time: "8 hours ago",
    },
    {
      id: "SHP-004",
      description: "Educational Supplies",
      destination: "Kenya",
      status: "in-transit",
      time: "12 hours ago",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-400";
      case "in-transit":
        return "text-blue-400";
      case "delayed":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Recent Shipments</h2>
        <Link href="/public/browse" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
          View all
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      <div className="space-y-3">
        {recentShipments.map((shipment, index) => (
          <motion.div
            key={shipment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-white/70" />
                <div>
                  <p className="text-white font-medium">{shipment.description}</p>
                  <div className="flex items-center space-x-3 text-sm text-white/60 mt-1">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {shipment.destination}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {shipment.time}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`text-sm font-medium ${getStatusColor(shipment.status)}`}>
                {shipment.status.replace("-", " ")}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentShipments;
