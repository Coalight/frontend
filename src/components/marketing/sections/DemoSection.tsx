"use client";

import { motion } from "framer-motion";
import { demoFeatures } from "../data/marketing-data";
import { Play, BookOpen } from "lucide-react";
import { useTheme } from "next-themes";

export default function DemoSection() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  return (
    <section
      className={`py-20 font-[Poppins] ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-6">
        <div
          className={`max-w-6xl mx-auto rounded-2xl overflow-hidden border ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-50 border-gray-200"
          } shadow-lg`}
        >
          <div className="grid lg:grid-cols-2">
            {/* Content Side */}
            <div className="p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen
                    className={`w-6 h-6 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <span
                    className={`text-sm font-semibold uppercase tracking-wider ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    Course Management Made Easy
                  </span>
                </div>

                <h3
                  className={`text-3xl lg:text-4xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  See Coalight in Action
                </h3>

                <p
                  className={`text-lg leading-relaxed mb-8 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Experience our intuitive course management platform designed
                  for modern educators. Free forever, powerful always.
                </p>
              </motion.div>

              {/* Feature List */}
              <div className="space-y-4 mb-10">
                {demoFeatures.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    whileHover={{ x: 5 }}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-white"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        darkMode ? "bg-blue-600" : "bg-blue-500"
                      } group-hover:scale-110 transition-transform duration-200`}
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span
                      className={`font-medium ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                <Play className="w-4 h-4" />
                Try Free Demo
              </motion.button>
            </div>

            {/* Visual Demo Side */}
            <div className="relative min-h-[400px] lg:min-h-[500px]">
              <div
                className={`absolute inset-0 ${
                  darkMode ? "bg-gray-900" : "bg-blue-50"
                }`}
              >
                {/* Floating Course Cards */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className={`absolute top-12 left-8 w-24 h-16 rounded-lg ${
                    darkMode
                      ? "bg-gray-800 border-gray-600"
                      : "bg-white border-gray-200"
                  } border shadow-md flex items-center justify-center`}
                >
                  <BookOpen
                    className={`w-6 h-6 ${
                      darkMode ? "text-blue-400" : "text-blue-500"
                    }`}
                  />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 15, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className={`absolute top-20 right-12 w-20 h-14 rounded-lg ${
                    darkMode
                      ? "bg-gray-800 border-gray-600"
                      : "bg-white border-gray-200"
                  } border shadow-md`}
                />

                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    opacity: [0.9, 1, 0.9],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className={`absolute bottom-16 left-12 w-28 h-12 rounded-lg ${
                    darkMode
                      ? "bg-gray-800 border-gray-600"
                      : "bg-white border-gray-200"
                  } border shadow-md`}
                />

                <motion.div
                  animate={{
                    y: [0, 8, 0],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                  className={`absolute bottom-24 right-8 w-16 h-18 rounded-lg ${
                    darkMode
                      ? "bg-gray-800 border-gray-600"
                      : "bg-white border-gray-200"
                  } border shadow-md`}
                />

                {/* Central Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut",
                    }}
                    className="relative"
                  >
                    <div
                      className={`w-32 h-32 rounded-full ${
                        darkMode
                          ? "bg-gray-800 border-gray-600"
                          : "bg-white border-gray-200"
                      } border-2 shadow-xl flex items-center justify-center`}
                    >
                      <div
                        className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold ${
                          darkMode ? "bg-blue-600" : "bg-blue-500"
                        }`}
                      >
                        C
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
