"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Heart,
  MapPin,
  Package,
  QrCode,
  Search,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";

const PublicHome: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for public stats
  const { data: publicStats } = useQuery({
    queryKey: ["public-stats"],
    queryFn: async () => ({
      totalShipments: 1247,
      delivered: 1158,
      totalValue: "$12.4M",
      countriesReached: 23,
      activeNGOs: 47,
      successRate: 94.3,
    }),
    refetchInterval: 30000,
  });

  // Mock recent shipments for public view
  const recentShipments = [
    { id: "1", description: "Emergency Medical Supplies", destination: "Port-au-Prince, Haiti", status: "delivered", value: "$45,000", ngo: "Red Cross International" },
    { id: "2", description: "Food & Water Distribution", destination: "Dhaka, Bangladesh", status: "in-transit", value: "$32,000", ngo: "UNICEF" },
    { id: "3", description: "Educational Materials", destination: "Nairobi, Kenya", status: "delivered", value: "$18,500", ngo: "Save the Children" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = searchQuery.trim();
    const match = raw.match(/\d+/);
    if (!match) {
      toast.error("Enter a numeric shipment ID (e.g., 1)");
      return;
    }
    router.push(`/public/track/${match[0]}`);
  };

  const features = [
    { icon: Shield, title: "Blockchain Secured", description: "Every transaction is immutably recorded on the Oasis Sapphire blockchain" },
    { icon: Zap, title: "Real-time Tracking", description: "Track your aid shipments with live updates from origin to destination" },
    { icon: Heart, title: "Full Transparency", description: "Complete visibility into how your donations are making an impact" },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
          Track Aid
          <span className="block text-gradient bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">With Confidence</span>
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          Follow humanitarian shipments in real-time with blockchain-verified transparency. Every package tracked, every
          delivery confirmed, every impact measurable.
        </p>

        {/* Search Bar */}
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/50" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Enter Shipment ID (e.g., 1)"
              className="w-full pl-12 pr-32 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
            />
            <button type="submit" className="absolute inset-y-0 right-0 pr-2 flex items-center">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2">
                <span>Track</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        </motion.form>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
          <span>Try:</span>
          {["1", "2", "3"].map(id => (
            <button key={id} onClick={() => setSearchQuery(id)} className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-all cursor-pointer">
              {id}
            </button>
          ))}
          <Link href="/public/browse" className="text-blue-400 hover:text-blue-300 flex items-center space-x-1">
            <span>Browse all shipments</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6"
      >
        {[
          {
            label: "Total Shipments",
            value: publicStats?.totalShipments.toLocaleString() || "0",
            icon: Package,
            color: "from-blue-400 to-blue-600",
          },
          {
            label: "Delivered",
            value: publicStats?.delivered.toLocaleString() || "0",
            icon: CheckCircle,
            color: "from-green-400 to-green-600",
          },
          {
            label: "Total Value",
            value: publicStats?.totalValue || "$0",
            icon: TrendingUp,
            color: "from-purple-400 to-purple-600",
          },
          {
            label: "Countries",
            value: publicStats?.countriesReached || "0",
            icon: Globe,
            color: "from-cyan-400 to-cyan-600",
          },
          {
            label: "NGO Partners",
            value: publicStats?.activeNGOs || "0",
            icon: Users,
            color: "from-pink-400 to-pink-600",
          },
          {
            label: "Success Rate",
            value: `${publicStats?.successRate || "0"}%`,
            icon: Shield,
            color: "from-emerald-400 to-emerald-600",
          },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card text-center group hover:scale-105 transition-transform">
              <div
                className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map(feature => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Recent Shipments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Recent Shipments</h2>
          <Link href="/public/browse" className="text-blue-400 hover:text-blue-300 flex items-center space-x-1">
            <span>View all</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentShipments.map((shipment, index) => (
            <motion.div
              key={shipment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="glass-card hover:bg-white/15 transition-all group cursor-pointer"
              onClick={() => router.push(`/public/track/${shipment.id}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {shipment.description}
                  </h3>
                  <p className="text-sm text-white/60">{shipment.id}</p>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs ${
                    shipment.status === "delivered" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {shipment.status === "delivered" ? "Delivered" : "In Transit"}
                </div>
              </div>

              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3" />
                  <span>{shipment.destination}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{shipment.ngo}</span>
                  <span className="font-medium text-white">{shipment.value}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-400 group-hover:text-blue-300 transition-colors">Track shipment →</span>
                  <QrCode className="h-4 w-4 text-white/50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Transparency in Every Step</h2>
        <p className="text-white/70 mb-6 max-w-2xl mx-auto">
          Our blockchain-based tracking system ensures complete accountability in humanitarian aid delivery. Every
          donation tracked, every delivery verified, every impact measured.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/public/about" className="glass-button text-white">
            Learn How It Works
          </Link>
          <Link href="/public/browse" className="glass-button text-white bg-blue-500/20">
            Browse Shipments
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PublicHome;
