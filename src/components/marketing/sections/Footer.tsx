"use client";

import Logo from "@/components/layout/Logo";
import { motion, useAnimation } from "framer-motion";
import { Copyright } from "lucide-react";
import { useEffect } from "react";
import { footerLinks, socialLinks } from "../data/marketing-data";

export default function Footer() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: { duration: 8, repeat: Infinity, ease: "linear" },
    });
  }, [controls]);

  return (
    <footer className="relative overflow-hidden" id="resources">
      {/* Animated bottom border */}
      <motion.div
        animate={controls}
        className="h-0.5 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        style={{
          backgroundSize: "400% 400%",
          backgroundImage:
            "linear-gradient(90deg, transparent, #3b82f6, #ec4899, #f97316, transparent)",
        }}
      />

      {/* Glass-morphism container */}
      <div className="bg-white/5 dark:bg-black/5 backdrop-blur-lg border-t border-gray-100/20 dark:border-gray-900/20">
        <div className="container mx-auto px-6 py-16">
          {/* Grid layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
            {footerLinks.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h2 className="text-md font-[700] text-gray-700 dark:text-gray-300 mb-4 tracking-widest">
                  {section.title}
                </h2>
                <ul className="space-y-3 ml-1">
                  {section.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 3 }}
                        className="text-sm font-light text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all"
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Social/CTA column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="col-span-2 md:col-span-4 lg:col-span-1"
            >
              <div className="flex flex-col items-start lg:items-end gap-6">
                <div>
                  <h2 className="text-md font-[700] text-gray-700 dark:text-gray-300 mb-4 tracking-widest">
                    CONNECT
                  </h2>
                  <div className="flex gap-3">
                    {socialLinks.map((item, i) => (
                      <motion.a
                        key={i}
                        href={item.link || "#"}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        target="_blank"
                        className={`p-2 size-10 flex items-center justify-center rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-gray-200/30 dark:border-gray-800/30 ${item.color}`}
                      >
                        {item.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom branding */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100/30 dark:border-gray-900/30">
            <Logo />

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-right flex font-[500] "
            >
              <Copyright size={16} className="mr-2" />{" "}
              {new Date().getFullYear()} Coalight. Redefining education.
              <br className="md:hidden" /> All rights reserved.
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
