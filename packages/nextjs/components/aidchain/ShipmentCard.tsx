import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Package, Calendar } from "lucide-react";
import { Shipment } from "~~/hooks/scaffold-eth";

interface ShipmentCardProps {
  shipment: Shipment;
  onClick?: () => void;
  showActions?: boolean;
  className?: string;
}

export const ShipmentCard: React.FC<ShipmentCardProps> = ({ 
  shipment, 
  onClick, 
  showActions = true,
  className = "" 
}) => {
  const getStatusLabel = (status: number): string => {
    switch (status) {
      case 0: return "Created";
      case 1: return "In Transit";
      case 2: return "Delivered";
      default: return "Unknown";
    }
  };

  const getStatusColor = (status: number): string => {
    switch (status) {
      case 0: return "bg-blue-500/20 text-blue-400";
      case 1: return "bg-yellow-500/20 text-yellow-400";
      case 2: return "bg-green-500/20 text-green-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getProgressPercentage = (status: number): number => {
    switch (status) {
      case 0: return 20;
      case 1: return 60;
      case 2: return 100;
      default: return 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card hover:bg-white/15 transition-all ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Package className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
              #{shipment.id}
            </h3>
            <p className="text-sm text-white/70">{shipment.description}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
          {getStatusLabel(shipment.status)}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-white/70">
            <MapPin className="h-4 w-4" />
            <span>
              {shipment.origin} → {shipment.destination}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-white/70">
            <Calendar className="h-4 w-4" />
            <span>ID: {shipment.id}</span>
          </div>
          <div className="text-white/70">
            <span className="font-mono text-xs">
              {shipment.currentCustodian.slice(0, 6)}...{shipment.currentCustodian.slice(-4)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Progress</span>
            <span className="text-white/70">{getProgressPercentage(shipment.status)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${getProgressPercentage(shipment.status)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {showActions && onClick && (
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-400 group-hover:text-blue-300 transition-colors flex items-center">
              View details
              <ArrowRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};
