"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Clock, MapPin, Package, Truck } from "lucide-react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const TrackShipment: React.FC = () => {
  const params = useParams();
  const shipmentIdNum = Number(params.id);

  // Read from ShipmentTracker
  const { data: shipment } = useScaffoldReadContract({
    contractName: "ShipmentTracker",
    functionName: "getShipment",
    args: [BigInt(isNaN(shipmentIdNum) ? 0 : shipmentIdNum)],
    watch: true,
  });
  const { data: checkpoints } = useScaffoldReadContract({
    contractName: "ShipmentTracker",
    functionName: "getCheckpoints",
    args: [BigInt(isNaN(shipmentIdNum) ? 0 : shipmentIdNum)],
    watch: true,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/public" className="glass-button p-2">
            <ArrowLeft className="h-5 w-5 text-white" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Tracking: {shipmentIdNum}</h1>
            <p className="text-white/70">{shipment?.description ?? ""}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="glass-card px-4 py-2">
            <p className="text-sm text-white/70">Status</p>
            <p className="text-lg font-semibold text-blue-400">
              {shipment ? (shipment.status === 2n ? "Delivered" : shipment.status === 1n ? "In Transit" : "Created") : "-"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card text-center">
          <MapPin className="h-8 w-8 text-purple-400 mx-auto mb-2" />
          <p className="text-sm text-white/70">Origin → Destination</p>
          <p className="text-xl font-bold text-white">{shipment ? `${shipment.origin} → ${shipment.destination}` : "-"}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card text-center">
          <Package className="h-8 w-8 text-blue-400 mx-auto mb-2" />
          <p className="text-sm text-white/70">Custodian</p>
          <p className="text-sm font-mono text-white break-all">{shipment?.currentCustodian ?? "-"}</p>
        </motion.div>
      </div>

      {/* Tracking Timeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Truck className="h-6 w-6 mr-2" />
          Shipment Timeline
        </h2>
        <div className="space-y-6">
          {checkpoints?.map((checkpoint, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${index === (checkpoints.length - 1) ? "bg-blue-500 ring-4 ring-blue-500/20" : "bg-green-500"}`}
              >
                {index === (checkpoints.length - 1) ? <Clock className="h-5 w-5 text-white" /> : <CheckCircle className="h-5 w-5 text-white" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${index === (checkpoints.length - 1) ? "text-blue-400" : "text-white"}`}>{checkpoint.location}</h3>
                  <span className={`text-sm px-2 py-1 rounded-full ${index === (checkpoints.length - 1) ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}`}>
                    {index === (checkpoints.length - 1) ? "Latest" : "Verified"}
                  </span>
                </div>
                <p className="text-sm text-white/60 mt-1">{new Date(Number(checkpoint.timestamp) * 1000).toLocaleString()}</p>
              </div>
            </div>
          ))}
          {!checkpoints?.length && <p className="text-white/60">No checkpoints yet.</p>}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
        <p className="text-white/70">Data is fetched live from the smart contract.</p>
      </motion.div>
    </div>
  );
};

export default TrackShipment;
