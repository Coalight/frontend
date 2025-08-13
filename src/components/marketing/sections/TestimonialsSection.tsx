"use client";

import { motion } from "framer-motion";
import { testimonials } from "../data/marketing-data";
import { Star } from "lucide-react";
import { useTheme } from "next-themes";

export default function TestimonialsSection() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  return (
    <section
      className={`py-20 font-[Poppins] ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            What Teachers Say
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Hear from educators who use Coalight every day to make teaching
            easier
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              className={`p-6 rounded-xl transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800 border border-gray-700 hover:bg-gray-750"
                  : "bg-white border border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`fill-current ${
                      darkMode ? "text-yellow-400" : "text-yellow-500"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote
                className={`text-base mb-6 leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                &quot;{testimonial.content}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                    darkMode ? "bg-blue-600" : "bg-blue-500"
                  }`}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div
                    className={`font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {testimonial.name}
                  </div>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {testimonial.role}
                  </div>
                  {testimonial.company && (
                    <div
                      className={`text-xs ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {testimonial.company}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
