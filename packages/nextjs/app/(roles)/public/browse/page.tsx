"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Building, Calendar, ChevronDown, DollarSign, Filter, MapPin, Package, Search } from "lucide-react";

const BrowseShipments: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrg, setSelectedOrg] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Mock shipments data
  const shipments = [
    {
      id: "SHP-001",
      description: "Emergency Medical Supplies",
      destination: "Port-au-Prince, Haiti",
      status: "delivered",
      value: "$45,000",
      ngo: "Red Cross International",
      date: "2024-01-15",
      progress: 100,
    },
    {
      id: "SHP-002",
      description: "Food & Water Distribution",
      destination: "Dhaka, Bangladesh",
      status: "in-transit",
      value: "$32,000",
      ngo: "UNICEF",
      date: "2024-01-18",
      progress: 75,
    },
    {
      id: "SHP-003",
      description: "Educational Materials",
      destination: "Nairobi, Kenya",
      status: "delivered",
      value: "$18,500",
      ngo: "Save the Children",
      date: "2024-01-12",
      progress: 100,
    },
    {
      id: "SHP-004",
      description: "Shelter Construction Materials",
      destination: "Gaziantep, Turkey",
      status: "processing",
      value: "$67,000",
      ngo: "Doctors Without Borders",
      date: "2024-01-20",
      progress: 25,
    },
    {
      id: "SHP-005",
      description: "Water Purification Equipment",
      destination: "Aleppo, Syria",
      status: "in-transit",
      value: "$89,000",
      ngo: "World Health Organization",
      date: "2024-01-19",
      progress: 60,
    },
    {
      id: "SHP-006",
      description: "Emergency Food Supplies",
      destination: "Kharkiv, Ukraine",
      status: "delivered",
      value: "$23,000",
      ngo: "World Food Programme",
      date: "2024-01-10",
      progress: 100,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/20 text-green-400";
      case "in-transit":
        return "bg-blue-500/20 text-blue-400";
      case "processing":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || shipment.status === selectedStatus;
    const matchesOrg = selectedOrg === "all" || shipment.ngo === selectedOrg;

    return matchesSearch && matchesStatus && matchesOrg;
  });

  const organizations = [...new Set(shipments.map(s => s.ngo))];
  const statuses = [...new Set(shipments.map(s => s.status))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Browse Shipments</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explore all humanitarian aid shipments tracked on our platform. Complete transparency, verified on
            blockchain.
          </p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="glass-card space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/50" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by ID, description, or destination..."
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2 glass-button">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
            <p className="text-white/60 text-sm">
              Showing {filteredShipments.length} of {shipments.length} shipments
            </p>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={e => setSelectedStatus(e.target.value)}
                    className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="all">All Statuses</option>
                    {statuses.map(status => (
                      <option key={status} value={status} className="bg-gray-800">
                        {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Organization</label>
                  <select
                    value={selectedOrg}
                    onChange={e => setSelectedOrg(e.target.value)}
                    className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="all">All Organizations</option>
                    {organizations.map(org => (
                      <option key={org} value={org} className="bg-gray-800">
                        {org}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Shipments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredShipments.map((shipment, index) => (
          <motion.div
            key={shipment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div
              className="glass-card hover:bg-white/15 transition-all cursor-pointer group"
              onClick={() => router.push(`/public/track/${shipment.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Package className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {shipment.id}
                    </h3>
                    <p className="text-sm text-white/70">{shipment.description}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                  {shipment.status.replace("-", " ")}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-white/70">
                    <MapPin className="h-4 w-4" />
                    <span>{shipment.destination}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70">
                    <DollarSign className="h-4 w-4" />
                    <span>{shipment.value}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-white/70">
                    <Building className="h-4 w-4" />
                    <span>{shipment.ngo}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70">
                    <Calendar className="h-4 w-4" />
                    <span>{shipment.date}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Progress</span>
                    <span className="text-white/70">{shipment.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${shipment.progress}%` }}
                    ></div>
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
        ))}
      </div>

      {/* No Results */}
      {filteredShipments.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No shipments found</h3>
            <p className="text-white/70 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedStatus("all");
                setSelectedOrg("all");
              }}
              className="glass-button"
            >
              Clear Filters
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BrowseShipments;
