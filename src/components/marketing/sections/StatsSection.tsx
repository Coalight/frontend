"use client";

import { motion } from "framer-motion";
import { stats } from "../data/marketing-data";
import { useEffect, useState } from "react";

function AnimatedCounter({
  value,
  duration = 2000,
}: {
  value: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^\d]/g, ""));

  useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * numericValue));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [numericValue, duration]);

  return <span>{value.replace(/\d+/, count.toLocaleString())}</span>;
}

export default function StatsSection() {
  return (
    <section className="relative py-32 bg-black overflow-hidden font-[Poppins]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Trusted by
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Educators Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join the growing community of teachers revolutionizing education
            with Coalight
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group text-center p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-500"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300"
              >
                <AnimatedCounter value={stat.value} duration={2000} />
              </motion.div>
              <div className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                {stat.label}
              </div>
              <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-lg font-semibold text-gray-400 mb-8">
            Empowering education across all sectors
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {[
              { name: "Public Schools", emoji: "🏫" },
              { name: "Private Schools", emoji: "🎓" },
              { name: "Universities", emoji: "🏛️" },
              { name: "Homeschool", emoji: "🏠" },
              { name: "Tutoring", emoji: "👨‍🏫" },
            ].map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1, y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex flex-col items-center space-y-2 p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-2xl group-hover:scale-125 transition-transform duration-300">
                  {type.emoji}
                </div>
                <div className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                  {type.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
