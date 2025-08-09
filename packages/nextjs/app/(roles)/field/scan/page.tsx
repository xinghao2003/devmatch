"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { QrCode, MapPin, CheckCircle } from "lucide-react";

const FieldScanPage: React.FC = () => {
  const router = useRouter();
  const [shipmentId, setShipmentId] = useState("");

  const goCheckpoint = () => {
    if (!shipmentId.trim()) return;
    router.push(`/field/checkpoint?shipId=${encodeURIComponent(shipmentId.trim())}`);
  };

  const goDelivery = () => {
    if (!shipmentId.trim()) return;
    router.push(`/field/delivery?shipId=${encodeURIComponent(shipmentId.trim())}`);
  };

  return (
    <div className="max-w-xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="glass-card p-6">
          <h1 className="text-2xl font-bold text-white mb-1">Scan Shipment</h1>
          <p className="text-white/70 mb-6">Mock scanner for MVP: enter shipment ID manually.</p>

          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-xl p-3">
              <QrCode className="h-4 w-4 text-white/60" />
              <input
                className="w-full bg-transparent outline-none text-white placeholder-white/50"
                placeholder="Enter shipment ID (e.g., 1)"
                value={shipmentId}
                onChange={e => setShipmentId(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button onClick={goCheckpoint} className="glass-button bg-blue-500/30 text-white flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Add Checkpoint
              </button>
              <button onClick={goDelivery} className="glass-button bg-green-500/30 text-white flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Mark Delivered
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FieldScanPage;


