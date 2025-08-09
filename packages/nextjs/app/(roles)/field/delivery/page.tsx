"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../../contexts/AuthContext";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const FieldDeliveryPage: React.FC = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const shipIdParam = searchParams.get("shipId") || "";
  const [shipId, setShipId] = useState(shipIdParam);
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const shipmentIdBigInt = useMemo(() => {
    const n = Number(shipId);
    return BigInt(isNaN(n) ? 0 : n);
  }, [shipId]);

  const { writeContractAsync, isPending, isMining } = useScaffoldWriteContract({ contractName: "ShipmentTracker" });

  const onSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (user?.role !== "field") {
      toast.error("Only the FIELD wallet can mark delivery");
      return;
    }
    if (!shipId.trim() || !location.trim()) {
      toast.error("Provide shipment ID and location");
      return;
    }
    try {
      setSubmitting(true);
      await writeContractAsync({ functionName: "markDelivered", args: [shipmentIdBigInt, location.trim()] });
      toast.success("Delivery submitted");
      router.push("/field");
    } catch {
      // notifications handled upstream
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="glass-card p-6">
          <h1 className="text-2xl font-bold text-white mb-1">Mark Delivered</h1>
          <p className="text-white/70 mb-6">Finalize a shipment at its destination.</p>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-white/70 mb-2">Shipment ID</label>
              <input
                className="w-full bg-white/10 rounded-xl p-3 text-white placeholder-white/50 outline-none"
                placeholder="e.g., 1"
                value={shipId}
                onChange={e => setShipId(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Location</label>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl p-3">
                <MapPin className="h-4 w-4 text-white/60" />
                <input
                  className="w-full bg-transparent outline-none text-white placeholder-white/50"
                  placeholder="e.g., Village X"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || isPending || isMining}
              className="glass-button bg-green-500/30 text-white flex items-center gap-2 disabled:opacity-60"
            >
              {submitting || isPending || isMining ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <span>{submitting || isPending || isMining ? "Submitting..." : "Submit Delivery"}</span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default FieldDeliveryPage;


