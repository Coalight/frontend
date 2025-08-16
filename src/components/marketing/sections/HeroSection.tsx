"use client";

import DarkVeil from "@/components/marketing/ui/DarkVeil";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const randomHueShift = Math.floor(Math.random() * 360); // 0 - 360

export default function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <section
      className="min-h-screen w-full  flex items-center justify-center p-6 relative bg-background"
      id="top"
    >
      {/* bg design  */}
      {!isMobile && <DarkVeil speed={0.3} hueShift={randomHueShift} />}

      <div className="max-w-4xl mx-auto text-center z-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full mb-8 border border-gray-800"
        >
          <Sparkles className="w-4 h-4 text-red-400" />
          <span className="text-sm font-medium text-white">
            Smart Learning Revolution
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="block  text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600 dark:from-white">
            The Smarter Way to
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r  from-black to-gray-600 dark:from-white">
            Teach & Learn
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-[500]"
        >
          Transform your teaching with intelligent tools that adapt to every
          student&apos;s learning style.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-3.5 dark:bg-white dark:text-black bg-black text-white font-medium rounded-lg flex items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-3.5 dark:text-white text-black font-medium rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-sm text-gray-500"
        >
          <p>Trusted by educators at 1,000+ institutions worldwide</p>
        </motion.div>

        {/* Add this after your existing trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-24"
        >
          {/* Subtle animated line */}
          <motion.div
            className="relative h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-gray-500 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.div
              className="absolute -top-1 left-1/2 w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                x: [-60, 60, -60],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Ultra-minimal text */}
          <motion.p
            className="mt-8 text-xs text-gray-500 tracking-widest uppercase"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.4 }}
          >
            Elevating Education
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
