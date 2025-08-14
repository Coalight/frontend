"use client";

import { motion } from "framer-motion";
import {
  Globe,
  School,
  Users,
  Map as MapIcon,
  GraduationCap,
  Building,
  Rocket,
  LucideIcon,
  Sparkle,
  Clock3,
} from "lucide-react";

export default function StatsSection() {
  return (
    <section className="relative py-20 dark:bg-black bg-white ">
      <div className="container mx-auto px-4 max-w-6xl relative z-10 ">
        {/* Sleek header with Lucide icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex rounded-full items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 dark:from-gray-900/80 dark:to-gray-800/90  border border-white/10 dark:border-gray-700/50 hover:border-blue-300/30 dark:hover:border-indigo-500/50 transition-all duration-300 shadow-sm hover:shadow-blue-200/10 dark:hover:shadow-indigo-500/10 backdrop-blur-sm">
            <Globe className="w-5 h-5 text-blue-400 dark:text-indigo-300" />
            <span className="text-sm font-semibold text-black dark:text-white">
              Global Impact
            </span>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75" />
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight mt-5">
            Redefining{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600 dark:from-white">
              education
            </span>{" "}
            standards
          </h2>
          <p className="dark:text-gray-300 text-gray-800 max-w-2xl mx-auto">
            Trusted by forward-thinking educators worldwide to deliver
            exceptional learning experiences
          </p>
        </motion.div>

        {/* Stats Section  */}
        <StatsGrid />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-white/5 dark:bg-black/5 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
            <Sparkle className="w-4 h-4 text-blue-500 dark:text-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
              Trusted by leading institutions
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-1" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mt-8">
            {[
              {
                name: "Universities",
                icon: <GraduationCap className="w-4 h-4" />,
              },
              { name: "Schools", icon: <School className="w-4 h-4" /> },
              { name: "Bootcamps", icon: <Rocket className="w-4 h-4" /> },
              { name: "Enterprises", icon: <Building className="w-4 h-4" /> },
            ].map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-full
             bg-transparent 
             border border-gray-200/20 dark:border-gray-700/50
            
             backdrop-blur-sm
             transition-all duration-300 ease-in-out"
              >
                <div className="text-blue-500 dark:text-blue-400">
                  {type.icon}
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {type.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

function StatCard({
  value,
  label,
  icon: Icon,
  iconColor = "text-blue-400",
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`p-6 rounded-xl bg-gradient-to-b from-gray-300 dark:from-white/5 to-transparent transition-all ${className}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className="text-3xl font-bold text-black dark:text-white mb-2">
        {value}
      </div>
      <div className="dark:text-gray-300 text-black font-medium text-sm">
        {label}
      </div>
    </div>
  );
}

function StatsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
      <StatCard
        value="50K+"
        label="Active Users"
        icon={Users}
        iconColor="text-blue-400"
      />
      <StatCard
        value="99.9%"
        label="Uptime"
        icon={Clock3}
        iconColor="text-pink-400"
      />
      <StatCard
        value="100+"
        label="Countries"
        icon={MapIcon}
        iconColor="text-indigo-400"
      />
      <StatCard
        value="100+"
        label="Universities"
        icon={School}
        iconColor="text-green-400"
      />
    </div>
  );
}
