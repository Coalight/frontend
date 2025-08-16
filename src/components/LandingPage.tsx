"use client";

import Head from "next/head";
import {
  HeroSection,
  FeaturesSection,
  StatsSection,
  TestimonialsSection,
  Footer,
} from "./marketing";
import Navbar from "./basic/Navbar";
import { useTheme } from "next-themes";

export default function LandingPage() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <Head>
        <title>Coalight - Next Generation Learning Platform</title>
        <meta
          name="description"
          content="From Grit to Growth - The modern way to organize courses and learning"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Coalight - Next Generation Learning Platform"
        />
        <meta
          property="og:description"
          content="From Grit to Growth - The modern way to organize courses and learning"
        />
        <meta property="og:type" content="website" />
      </Head>

      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
