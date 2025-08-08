"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, trend, color }) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="glass-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/60 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && <p className="text-sm text-green-400 mt-2">{trend}</p>}
        </div>
        <div className={`p-4 rounded-xl bg-gradient-to-br ${color} bg-opacity-20`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
