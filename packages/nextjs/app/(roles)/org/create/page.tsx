"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Loader2, MapPin, Package, Text } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../../contexts/AuthContext";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const CreateShipmentPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [description, setDescription] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { writeContractAsync, isPending, isMining } = useScaffoldWriteContract({ contractName: "ShipmentTracker" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.role !== "org") {
      toast.error("Only the organization wallet can create shipments");
      return;
    }
    if (!description.trim() || !origin.trim() || !destination.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setSubmitting(true);
      await writeContractAsync(
        {
          functionName: "createShipment",
          args: [description.trim(), origin.trim(), destination.trim()],
        },
        {
          blockConfirmations: 1,
          onBlockConfirmation: () => {
            toast.success("Shipment created");
            router.push("/org/shipments");
          },
        },
      );
    } catch (err: any) {
      // Error notifications come from the scaffold hook already; keep it quiet here
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (user?.role !== "org") {
    return (
      <div className="max-w-xl mx-auto">
        <div className="glass-card p-6">
          <h1 className="text-2xl font-semibold text-white mb-2">Access restricted</h1>
          <p className="text-white/70">Connect with the ORG wallet to create shipments.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="glass-card p-6">
          <h1 className="text-2xl font-bold text-white mb-1">Create Shipment</h1>
          <p className="text-white/70 mb-6">Enter basic shipment details. You can add checkpoints later.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-white/70 mb-2">Description</label>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl p-3">
                <Text className="h-4 w-4 text-white/60" />
                <input
                  className="w-full bg-transparent outline-none text-white placeholder-white/50"
                  placeholder="e.g., 500 blankets, 100 food kits"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Origin</label>
                <div className="flex items-center gap-2 bg-white/10 rounded-xl p-3">
                  <MapPin className="h-4 w-4 text-white/60" />
                  <input
                    className="w-full bg-transparent outline-none text-white placeholder-white/50"
                    placeholder="e.g., Kuala Lumpur"
                    value={origin}
                    onChange={e => setOrigin(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Destination</label>
                <div className="flex items-center gap-2 bg-white/10 rounded-xl p-3">
                  <Package className="h-4 w-4 text-white/60" />
                  <input
                    className="w-full bg-transparent outline-none text-white placeholder-white/50"
                    placeholder="e.g., Sabah"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting || isPending || isMining}
                className="glass-button bg-blue-500/30 text-white flex items-center gap-2 disabled:opacity-60"
              >
                {(submitting || isPending || isMining) ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                <span>{(submitting || isPending || isMining) ? "Submitting..." : "Create Shipment"}</span>
              </button>

              <button type="button" onClick={() => router.push("/org")} className="glass-button text-white">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateShipmentPage;


