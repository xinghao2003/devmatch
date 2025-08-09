"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Building, Calendar, DollarSign, MapPin, Package, Search } from "lucide-react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const OrgShipmentsPage: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Read total shipments and derive id list
  const { data: total, refetch: refetchTotal } = useScaffoldReadContract({
    contractName: "ShipmentTracker",
    functionName: "totalShipments",
    args: [],
    watch: true,
  });
  const count = Number(total ?? 0n);
  const ids = useMemo(() => Array.from({ length: count }, (_, i) => i + 1), [count]);

  const filteredIds = useMemo(() => {
    if (!query.trim()) return ids;
    const n = Number(query.trim());
    if (!isNaN(n)) return ids.filter(id => id === n);
    return ids; // for MVP only numeric filter
  }, [ids, query]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-white mb-2">Shipments</h1>
          <p className="text-white/70">Live list sourced from the smart contract.</p>
        </div>
      </motion.div>

      {/* Search by ID */}
      <div className="glass-card p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white/50" />
          </div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by shipment ID (e.g., 1)"
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="mt-3 flex gap-3">
            <button onClick={() => refetchTotal()} className="glass-button text-white">Refresh</button>
            <button onClick={() => setQuery("")} className="glass-button text-white">Clear</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredIds.map((id, index) => (
          <ShipmentCard key={id} id={id} index={index} onOpen={() => router.push(`/public/track/${id}`)} />)
        )}
      </div>
    </div>
  );
};

export default OrgShipmentsPage;

// Isolated card component so hooks are used safely
const ShipmentCard: React.FC<{ id: number; index: number; onOpen: () => void }> = ({ id, index, onOpen }) => {
  const { data: s } = useScaffoldReadContract({
    contractName: "ShipmentTracker",
    functionName: "getShipment",
    args: [BigInt(id)],
    watch: true,
  });

  if (!s) return null;

  const statusLabel = s.status === 2n ? "Delivered" : s.status === 1n ? "In Transit" : "Created";
  const statusKey = s.status === 2n ? "delivered" : s.status === 1n ? "in-transit" : "processing";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }}>
      <div className="glass-card hover:bg-white/15 transition-all cursor-pointer group" onClick={onOpen}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Package className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">#{id}</h3>
              <p className="text-sm text-white/70">{s.description}</p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(statusKey)}`}>{statusLabel}</div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-white/70">
              <MapPin className="h-4 w-4" />
              <span>
                {s.origin} → {s.destination}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-white/70">
              <DollarSign className="h-4 w-4" />
              <span className="font-mono text-xs">{s.currentCustodian.slice(0, 6)}...{s.currentCustodian.slice(-4)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-white/70">
              <Building className="h-4 w-4" />
              <span>—</span>
            </div>
            <div className="flex items-center space-x-2 text-white/70">
              <Calendar className="h-4 w-4" />
              <span>id: {id}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-400 group-hover:text-blue-300 transition-colors flex items-center">
              Track details
              <ArrowRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function getStatusColor(status: "delivered" | "in-transit" | "processing") {
  switch (status) {
    case "delivered":
      return "bg-green-500/20 text-green-400";
    case "in-transit":
      return "bg-blue-500/20 text-blue-400";
    default:
      return "bg-yellow-500/20 text-yellow-400";
  }
}


