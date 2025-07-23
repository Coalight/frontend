"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Loading() {
  const [isDelayed, setIsDelayed] = useState(false);

  // Only show loader after a short delay to prevent flash on fast loads
  useEffect(() => {
    const timer = setTimeout(() => setIsDelayed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!isDelayed) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen"
    >
      {/* Backdrop with blur and dark/light mode support */}
      <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm" />
      
      {/* Spinner container */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Spinner with dark/light mode colors */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-12 h-12 rounded-full border-4 border-transparent
                   border-t-blue-500 dark:border-t-blue-400
                   border-r-blue-500 dark:border-r-blue-400"
        />
        
        {/* Optional text with dark/light mode support */}
        <p className="text-gray-800 dark:text-gray-200 font-medium">
          Loading...
        </p>
      </div>
    </motion.div>
  );
}
