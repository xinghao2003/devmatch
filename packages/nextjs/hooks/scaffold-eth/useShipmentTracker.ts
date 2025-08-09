import { useScaffoldReadContract, useScaffoldWriteContract } from "./index";
import { useScaffoldEventHistory } from "./useScaffoldEventHistory";

export interface Shipment {
  id: bigint;
  description: string;
  origin: string;
  destination: string;
  status: number; // 0: Created, 1: InTransit, 2: Delivered
  currentCustodian: string;
}

export interface Checkpoint {
  timestamp: bigint;
  location: string;
  updatedBy: string;
}

export const useShipmentTracker = () => {
  // Read operations
  const { data: totalShipments } = useScaffoldReadContract({
    contractName: "ShipmentTracker",
    functionName: "totalShipments",
  });

  // Write operations
  const { writeContractAsync: writeShipmentTrackerAsync } = useScaffoldWriteContract({
    contractName: "ShipmentTracker",
  });

  const createShipment = async (description: string, origin: string, destination: string) => {
    return await writeShipmentTrackerAsync({
      functionName: "createShipment",
      args: [description, origin, destination],
    });
  };

  const addCheckpoint = async (id: bigint, location: string) => {
    return await writeShipmentTrackerAsync({
      functionName: "addCheckpoint",
      args: [id, location],
    });
  };

  const markDelivered = async (id: bigint, location: string) => {
    return await writeShipmentTrackerAsync({
      functionName: "markDelivered",
      args: [id, location],
    });
  };

  // Events
  const { data: shipmentCreatedEvents } = useScaffoldEventHistory({
    contractName: "ShipmentTracker",
    eventName: "ShipmentCreated",
    watch: true,
  });

  const { data: checkpointAddedEvents } = useScaffoldEventHistory({
    contractName: "ShipmentTracker",
    eventName: "CheckpointAdded",
    watch: true,
  });

  const { data: shipmentDeliveredEvents } = useScaffoldEventHistory({
    contractName: "ShipmentTracker",
    eventName: "ShipmentDelivered",
    watch: true,
  });

  return {
    // Read operations
    totalShipments,
    
    // Write operations
    createShipment,
    addCheckpoint,
    markDelivered,
    
    // Events
    shipmentCreatedEvents,
    checkpointAddedEvents,
    shipmentDeliveredEvents,
  };
};
