"use client";

import { motion } from "framer-motion";
import { features } from "../data/marketing-data";
import FeatureCard from "../ui/FeatureCard";
import { useTheme } from "next-themes";

export default function FeaturesSection() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  return (
    <section
      className={`py-32 relative overflow-hidden dark:bg-black bg-gray-50
      `}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-600/10 border border-cyan-400/20 mb-6"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Powerful Features
            </span>
          </motion.div>

          <h2
            className={`text-4xl md:text-6xl font-black mb-6 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Built for{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Modern Education
            </span>
          </h2>

          <p
            className={`text-xl max-w-3xl mx-auto ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Experience the future of learning with AI-powered tools designed to
            enhance collaboration, streamline workflows, and maximize
            educational outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
