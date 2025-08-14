"use client";

import { motion } from "framer-motion";
import { Feature } from "../data/marketing-data";
import { ArrowRight, Sparkles } from "lucide-react";

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon;
  const gradientClasses = [
    "from-blue-500 to-purple-600",
    "from-purple-500 to-pink-600",
    "from-pink-500 to-red-600",
    "from-green-500 to-blue-600",
    "from-yellow-500 to-orange-600",
    "from-indigo-500 to-purple-600",
  ];

  const currentGradient = gradientClasses[index % gradientClasses.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
      className="group relative p-6 bg-white dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Background glow on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
      />

      {/* Icon with gradient background */}
      <div className="flex items-center mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r ${currentGradient} rounded-lg shadow-sm`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>

        {/* Stats badge */}
        <div
          className={`ml-auto px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${currentGradient} text-white`}
        >
          {feature.stats}
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3
          className={`text-xl font-bold mb-3 bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent`}
        >
          {feature.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          {feature.description}
        </p>

        {/* Learn More link */}
        <motion.div
          whileHover={{ x: 3 }}
          className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Learn more
          <ArrowRight className="ml-1 w-4 h-4" />
        </motion.div>
      </div>

      {/* Subtle sparkle decoration */}
      {index % 3 === 0 && (
        <motion.div
          animate={{
            y: [-3, 3, -3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-2 right-2 opacity-30 group-hover:opacity-70 transition-opacity"
        >
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </motion.div>
      )}
    </motion.div>
  );
}
