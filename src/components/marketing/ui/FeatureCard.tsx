"use client";

import { motion } from "framer-motion";
import { Feature } from "../data/marketing-data";
import { ArrowRight, Sparkles } from "lucide-react";

interface FeatureCardProps {
  feature: Feature;
  index: number;
  darkMode: boolean;
}

export default function FeatureCard({
  feature,
  index,
  darkMode,
}: FeatureCardProps) {
  // Suppress unused variable warning
  void darkMode;

  const Icon = feature.icon;
  const gradientClasses = [
    "from-blue-500 to-purple-600",
    "from-purple-500 to-pink-600",
    "from-pink-500 to-red-600",
    "from-green-500 to-blue-600",
    "from-yellow-500 to-orange-600",
    "from-indigo-500 to-purple-600",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{
        y: -15,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className="group relative p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-500 overflow-hidden"
    >
      {/* Background Gradient on Hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${
          gradientClasses[index % gradientClasses.length]
        } opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Floating Sparkles */}
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5,
        }}
        className="absolute top-4 right-4 opacity-20 group-hover:opacity-60 transition-opacity duration-300"
      >
        <Sparkles className="w-6 h-6 text-yellow-400" />
      </motion.div>

      {/* Stats Badge */}
      <div className="absolute -top-3 -right-3">
        <div
          className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${
            gradientClasses[index % gradientClasses.length]
          } text-white shadow-lg`}
        >
          {feature.stats}
        </div>
      </div>

      {/* Icon */}
      <motion.div
        whileHover={{
          scale: 1.1,
          rotate: 360,
          transition: { duration: 0.6 },
        }}
        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${
          gradientClasses[index % gradientClasses.length]
        } rounded-2xl mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300`}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <motion.h3
          className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
          style={{
            backgroundImage:
              index % 2 === 0
                ? "linear-gradient(to right, rgb(59 130 246), rgb(147 51 234))"
                : "linear-gradient(to right, rgb(147 51 234), rgb(236 72 153))",
          }}
        >
          {feature.title}
        </motion.h3>

        <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
          {feature.description}
        </p>

        {/* Learn More Button */}
        <motion.div
          whileHover={{ x: 5 }}
          className="flex items-center space-x-2 text-gray-400 group-hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <span className="text-sm font-semibold">Learn More</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${
          gradientClasses[index % gradientClasses.length]
        } rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
      />
    </motion.div>
  );
}
