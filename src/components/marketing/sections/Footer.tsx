"use client";

import { motion } from "framer-motion";
import { footerLinks, socialLinks } from "../data/marketing-data";
import { BookOpen, Heart } from "lucide-react";
import { useTheme } from "next-themes";

export default function Footer() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  return (
    <footer
      className={`py-16 font-[Poppins] ${
        darkMode
          ? "bg-gray-800 border-t border-gray-700"
          : "bg-white border-t border-gray-200"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 mb-6"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  darkMode ? "bg-blue-600" : "bg-blue-500"
                }`}
              >
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <span
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Coalight
                </span>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Course Management
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-lg leading-relaxed mb-6 max-w-md ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Free course management platform for educators. Create, manage, and
              connect with students - all in one place.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex space-x-4"
            >
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    darkMode
                      ? "bg-gray-700 hover:bg-blue-600 text-gray-400 hover:text-white"
                      : "bg-gray-100 hover:bg-blue-500 text-gray-500 hover:text-white"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4
                className={`text-sm font-bold mb-4 uppercase tracking-wider ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((item, i) => (
                  <li key={i}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3 }}
                      className={`transition-colors ${
                        darkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4
                className={`text-sm font-bold mb-4 uppercase tracking-wider ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((item, i) => (
                  <li key={i}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3 }}
                      className={`transition-colors ${
                        darkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4
                className={`text-sm font-bold mb-4 uppercase tracking-wider ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((item, i) => (
                  <li key={i}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3 }}
                      className={`transition-colors ${
                        darkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`mt-12 pt-6 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`text-sm flex items-center gap-2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              © {new Date().getFullYear()} Coalight. All rights reserved. Made
              with
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              for educators.
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-sm ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Free forever • Built for education
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
