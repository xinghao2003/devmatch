import { useState, useEffect, useMemo } from "react";
import { useScaffoldReadContract } from "./index";
import { Shipment, Checkpoint } from "./useShipmentTracker";

export const useShipmentData = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  const { data: totalShipments } = useScaffoldReadContract({
    contractName: "ShipmentTracker",
    functionName: "totalShipments",
  });

  // For now, we'll use a simple approach and just return empty shipments
  // This can be enhanced later with proper data fetching
  useEffect(() => {
    setLoading(false);
    setShipments([]);
  }, []);

  // Get shipment by ID
  const getShipmentById = useMemo(() => {
    return (id: bigint): Shipment | undefined => {
      return shipments.find(shipment => shipment.id === id);
    };
  }, [shipments]);

  // Get shipments by status
  const getShipmentsByStatus = useMemo(() => {
    return (status: number): Shipment[] => {
      return shipments.filter(shipment => shipment.status === status);
    };
  }, [shipments]);

  // Get shipments by custodian
  const getShipmentsByCustodian = useMemo(() => {
    return (custodian: string): Shipment[] => {
      return shipments.filter(shipment => 
        shipment.currentCustodian.toLowerCase() === custodian.toLowerCase()
      );
    };
  }, [shipments]);

  // Get checkpoints for a shipment
  const getShipmentCheckpoints = (_id: bigint): Checkpoint[] => {
    // This would need to be implemented differently - for now return empty array
    return [];
  };

  // Refresh shipments data
  const refreshShipments = () => {
    setLoading(true);
    // This will trigger the useEffect to refetch
    setShipments([]);
  };

  // Get status label
  const getStatusLabel = (status: number): string => {
    switch (status) {
      case 0:
        return "Created";
      case 1:
        return "In Transit";
      case 2:
        return "Delivered";
      default:
        return "Unknown";
    }
  };

  // Get status color for UI
  const getStatusColor = (status: number): string => {
    switch (status) {
      case 0:
        return "bg-blue-100 text-blue-800";
      case 1:
        return "bg-yellow-100 text-yellow-800";
      case 2:
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return {
    // Data
    shipments,
    totalShipments,
    loading,
    error,
    
    // Methods
    getShipmentById,
    getShipmentsByStatus,
    getShipmentsByCustodian,
    getShipmentCheckpoints,
    refreshShipments,
    
    // Utilities
    getStatusLabel,
    getStatusColor,
  };
};
