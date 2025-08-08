"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Building, Calendar, CheckCircle, Clock, DollarSign, MapPin, Package, Truck } from "lucide-react";

const TrackShipment: React.FC = () => {
  const params = useParams();
  const shipmentId = params.id;

  // Mock shipment data - in production this would be fetched from the blockchain
  const shipment = {
    id: shipmentId,
    description: "Emergency Medical Supplies Package",
    value: "$45,000",
    ngo: "Red Cross International",
    status: "In Transit",
    currentLocation: "Port of Miami, FL",
    destination: "Port-au-Prince, Haiti",
    estimatedArrival: "2024-01-25",
    checkpoints: [
      {
        location: "Red Cross Warehouse, Atlanta",
        timestamp: "2024-01-20 09:00",
        status: "Packaged",
        verified: true,
      },
      {
        location: "Port of Miami, FL",
        timestamp: "2024-01-21 14:30",
        status: "Departed",
        verified: true,
      },
      {
        location: "At Sea - Caribbean",
        timestamp: "2024-01-22 08:15",
        status: "In Transit",
        verified: true,
        current: true,
      },
      {
        location: "Port-au-Prince, Haiti",
        timestamp: "Expected: 2024-01-25 10:00",
        status: "Expected Arrival",
        verified: false,
      },
    ],
    contents: [
      { item: "Surgical Masks", quantity: "10,000 units" },
      { item: "Antibiotics", quantity: "500 vials" },
      { item: "Medical Gauze", quantity: "2,000 rolls" },
      { item: "IV Fluid Bags", quantity: "1,000 units" },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <Link href="/public" className="glass-button p-2">
            <ArrowLeft className="h-5 w-5 text-white" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Tracking: {shipment.id}</h1>
            <p className="text-white/70">{shipment.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="glass-card px-4 py-2">
            <p className="text-sm text-white/70">Status</p>
            <p className="text-lg font-semibold text-blue-400">{shipment.status}</p>
          </div>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card text-center"
        >
          <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <p className="text-sm text-white/70">Total Value</p>
          <p className="text-xl font-bold text-white">{shipment.value}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card text-center"
        >
          <Building className="h-8 w-8 text-blue-400 mx-auto mb-2" />
          <p className="text-sm text-white/70">Organization</p>
          <p className="text-xl font-bold text-white">{shipment.ngo}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card text-center"
        >
          <MapPin className="h-8 w-8 text-purple-400 mx-auto mb-2" />
          <p className="text-sm text-white/70">Current Location</p>
          <p className="text-xl font-bold text-white">{shipment.currentLocation}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card text-center"
        >
          <Calendar className="h-8 w-8 text-orange-400 mx-auto mb-2" />
          <p className="text-sm text-white/70">Est. Arrival</p>
          <p className="text-xl font-bold text-white">{shipment.estimatedArrival}</p>
        </motion.div>
      </div>

      {/* Tracking Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Truck className="h-6 w-6 mr-2" />
          Shipment Timeline
        </h2>
        <div className="space-y-6">
          {shipment.checkpoints.map((checkpoint, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  checkpoint.current
                    ? "bg-blue-500 ring-4 ring-blue-500/20"
                    : checkpoint.verified
                      ? "bg-green-500"
                      : "bg-gray-500"
                }`}
              >
                {checkpoint.verified ? (
                  <CheckCircle className="h-5 w-5 text-white" />
                ) : (
                  <Clock className="h-5 w-5 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${checkpoint.current ? "text-blue-400" : "text-white"}`}>
                    {checkpoint.location}
                  </h3>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      checkpoint.current
                        ? "bg-blue-500/20 text-blue-400"
                        : checkpoint.verified
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {checkpoint.status}
                  </span>
                </div>
                <p className="text-sm text-white/60 mt-1">{checkpoint.timestamp}</p>
                {checkpoint.current && (
                  <p className="text-sm text-blue-400 mt-2 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                    Current location
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Package Contents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Package className="h-6 w-6 mr-2" />
          Package Contents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shipment.contents.map((item, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-xl">
              <div className="flex items-center justify-between">
                <p className="font-medium text-white">{item.item}</p>
                <p className="text-white/70">{item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Blockchain Verification */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20"
      >
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-green-500/20 rounded-xl">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Blockchain Verified</h3>
            <p className="text-white/70 mb-4">
              This shipment&apos;s data is immutably recorded on the Oasis Sapphire blockchain, ensuring complete
              transparency and preventing tampering.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400">Transaction Hash: 0x742d35cc...</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-blue-400">Block: #892,456</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrackShipment;
