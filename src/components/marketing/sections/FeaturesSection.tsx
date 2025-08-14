"use client";

import { motion } from "framer-motion";
import { features } from "../data/marketing-data";
import FeatureCard from "../ui/FeatureCard";

export default function FeaturesSection() {
  return (
    <section className="py-24 relative bg-gray-50 dark:bg-gray-900">
      {/* Grid pattern background */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-15">
        <div className="absolute inset-0 bg-[length:40px_40px] bg-grid-gray-800/[0.05] dark:bg-grid-white/[0.05]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gray-200 text-cyan-600 dark:bg-gray-800 dark:text-cyan-400 text-sm font-medium mb-4">
            Powerful Features
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Designed for{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Modern Learning
            </span>
          </h2>

          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            AI-enhanced tools that transform how educators teach and students
            learn, with intuitive interfaces and powerful functionality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard feature={feature} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
