/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
  useTransform,
} from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import ChangeThemeBtn from "./ChangeThemeBtn";

const Particle = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
  const x = useMotionValue(Math.random() * 100);
  const y = useMotionValue(Math.random() * 100);
  const size = useMotionValue(Math.random() * 3 + 1);
  const opacity = useMotionValue(Math.random() * 0.5 + 0.1);

  const distance = useTransform([mouseX, mouseY, x, y], ([mx, my, px, py]) =>
    Math.sqrt((Number(mx) - Number(px)) ** 2 + (Number(my) - Number(py)) ** 2)
  );

  const scale = useTransform(distance, [0, 200], [2, 0.5], { clamp: true });

  useEffect(() => {
    const moveParticle = () => {
      animate(x, Math.random() * 100, {
        duration: Math.random() * 10 + 10,
        onComplete: moveParticle,
      });
      animate(y, Math.random() * 100, {
        duration: Math.random() * 10 + 10,
      });
    };
    moveParticle();
  }, []);

  const left = useTransform(x, (v) => `${v}%`);
  const top = useTransform(y, (v) => `${v}%`);

  return (
    <motion.div
      className="absolute rounded-full bg-sky-400 dark:bg-sky-600"
      style={{
        left,
        top,
        width: size,
        height: size,
        opacity,
        scale,
      }}
    />
  );
};

const FloatingCube = () => {
  return (
    <motion.div
      className="w-4 h-4 border border-sky-400 dark:border-sky-600 absolute"
      initial={{ rotate: 0 }}
      animate={{
        rotate: 360,
        y: [0, -50, 0],
        x: [0, 20, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    />
  );
};

export default function NotFoundPage() {
  const router = useRouter();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [particles, setParticles] = useState<JSX.Element[]>([]);

  const radius = useMotionValue(0);
  const backgroundOpacity = useMotionValue(0.1);
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(56, 182, 255, 0.4), transparent 80%)`;

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }, (_, i) => (
        <Particle key={i} mouseX={mouseX} mouseY={mouseY} />
      ))
    );

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
      radius.set(Math.min(clientX * 0.3, 500));
      animate(backgroundOpacity, 0.3, { duration: 0.4 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <Head>
        <title>404 | Lost in the Void</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist in our digital universe"
        />
      </Head>

      <motion.div
        className="fixed top-4 right-4 z-50 text-sky-600 dark:text-sky-400 cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChangeThemeBtn />
      </motion.div>

      <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center justify-center p-4 text-gray-900 dark:text-white relative overflow-hidden">
        {/* Dynamic gradient background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background,
            opacity: backgroundOpacity,
          }}
        />

        {/* Particle system */}
        <div className="absolute inset-0 overflow-hidden">{particles}</div>

        {/* Floating cubes */}
        <FloatingCube />
        <FloatingCube />
        <FloatingCube />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Main content */}
        <div className="max-w-2xl w-full space-y-8 relative z-10 px-4">
          <motion.div
            className="text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* 3D floating 404 text */}
            <motion.div
              className="relative inline-block perspective-1000"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                className="text-9xl font-bold mb-4 text-sky-600 dark:text-sky-500 block"
                initial={{
                  scale: 0.8,
                  opacity: 0,
                  rotateX: 45,
                  rotateY: -15,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotateX: 0,
                  rotateY: 0,
                  textShadow: [
                    "0 0 10px rgba(56, 182, 255, 0)",
                    "0 0 20px rgba(56, 182, 255, 0.7)",
                    "0 0 10px rgba(56, 182, 255, 0)",
                  ],
                }}
                transition={{
                  scale: { duration: 0.8, type: "spring" },
                  opacity: { duration: 0.6 },
                  rotateX: { duration: 1.2, type: "spring" },
                  rotateY: { duration: 1.2, type: "spring", delay: 0.2 },
                  textShadow: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              >
                404
              </motion.span>

              {/* Glitch effect */}
              <motion.span
                className="absolute inset-0 text-9xl font-bold text-sky-400 dark:text-sky-300 opacity-0 pointer-events-none"
                animate={{
                  opacity: [0, 0.7, 0],
                  x: [0, 5, -5, 0],
                  y: [0, -3, 3, 0],
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.2, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
              >
                404
              </motion.span>
            </motion.div>

            {/* Error message */}
            <motion.h2
              className="text-3xl md:text-4xl font-light text-gray-700 dark:text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <span className="text-sky-600 dark:text-sky-400 font-medium">
                Quantum_Anomaly
              </span>{" "}
              Detected
            </motion.h2>

            {/* Diagnostic Console */}
            <motion.div
              className="bg-white/50 dark:bg-black/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 mb-10 text-left max-w-xl mx-auto font-mono text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 mb-4">
                <div className="w-3 h-3 rounded-full bg-sky-600 dark:bg-sky-400 animate-pulse" />
                <span>SYSTEM DIAGNOSTICS</span>
              </div>

              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p>
                  &gt; ERROR:{" "}
                  <span className="text-pink-600 dark:text-pink-400">
                    Temporal coordinates invalid
                  </span>
                </p>
                <p>
                  &gt; REASON:{" "}
                  <span className="text-amber-600 dark:text-amber-400">
                    Page does not exist in this timeline
                  </span>
                </p>
                <p>
                  &gt; SUGGESTED ACTION:{" "}
                  <span className="text-sky-600 dark:text-sky-400">
                    Navigate to known quantum node
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <Link href="/" passHref>
                <motion.div
                  className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 dark:bg-sky-800 dark:hover:bg-sky-700 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 group relative overflow-hidden text-white"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(56, 182, 255, 0.6)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">
                    Initiate Return Sequence
                  </span>
                  <motion.span
                    className="relative z-10"
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    →
                  </motion.span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </motion.div>
              </Link>

              <motion.button
                onClick={() => router.back()}
                className="px-8 py-3.5 bg-white/50 hover:bg-white/70 dark:bg-gray-900/80 dark:hover:bg-gray-900 border border-gray-300 hover:border-sky-400 dark:border-gray-800 dark:hover:border-sky-400 text-gray-700 hover:text-sky-600 dark:text-gray-300 dark:hover:text-sky-300 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(56, 182, 255, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Previous Dimension</span>
                <motion.span
                  className="relative z-10"
                  animate={{
                    x: [0, -4, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                >
                  ←
                </motion.span>
                <span className="absolute inset-0 bg-sky-200/20 dark:bg-sky-900/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Binary matrix rain */}
          <motion.div
            className="absolute -bottom-20 left-0 right-0 h-40 overflow-hidden opacity-20 dark:opacity-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 1 }}
          >
            {[...Array(50)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-sky-400 dark:text-sky-500 text-xs font-mono"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100 - 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                }}
                animate={{
                  y: `+=${window.innerHeight + 200}`,
                }}
                transition={{
                  duration: 5 + Math.random() * 15,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              >
                {Math.random() > 0.5 ? "1" : "0"}
                {Math.random() > 0.7
                  ? String.fromCharCode(65 + Math.floor(Math.random() * 26))
                  : ""}
              </motion.span>
            ))}
          </motion.div>

          {/* Status bar */}
          <motion.div
            className="absolute -bottom-4 left-0 right-0 text-center text-xs text-gray-500 dark:text-gray-400 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            SYSTEM STATUS:{" "}
            <span className="text-sky-600 dark:text-sky-400">STABLE</span> |
            QUANTUM_CONNECTION:{" "}
            <span className="text-sky-600 dark:text-sky-400">ACTIVE</span>
          </motion.div>
        </div>
      </div>
    </>
  );
}
