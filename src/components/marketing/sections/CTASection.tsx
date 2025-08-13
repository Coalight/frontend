"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BookOpen, CheckCircle } from "lucide-react";
import { useTheme } from "next-themes";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section
      className={`py-20 font-[Poppins] ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`max-w-4xl mx-auto rounded-2xl p-12 text-center ${
            darkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          } shadow-lg`}
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div
              className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                darkMode ? "bg-blue-600" : "bg-blue-500"
              }`}
            >
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Ready to Start Teaching?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-lg mb-8 max-w-2xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Join thousands of educators who create engaging classrooms with
            Coalight. Get started in minutes - completely free.
          </motion.p>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            {[
              "No credit card required",
              "5GB free storage",
              "Unlimited students",
              "Always free",
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <CheckCircle
                  className={`w-5 h-5 ${
                    darkMode ? "text-green-400" : "text-green-500"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {feature}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`flex-grow px-4 py-3 rounded-lg border transition-colors ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:border-blue-400 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Get Started Free
              </motion.button>
            </div>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className={`mt-4 p-3 rounded-lg ${
                    darkMode
                      ? "bg-green-900/30 text-green-400"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">
                      Thanks! Check your email to get started.
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
