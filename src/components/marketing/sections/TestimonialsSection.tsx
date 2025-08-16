"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Marquee } from "@/components/magicui/marquee";
import { testimonials } from "../data/marketing-data";
import { ReviewCard } from "../ui/ReviewCard";

export default function TestimonialsSection() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const firstRow = testimonials.slice(0, testimonials.length / 2);
  const secondRow = testimonials.slice(testimonials.length / 2);
  return (
    <section className={`py-20 font-[Poppins] bg-white dark:bg-black`}>
      <div className="mx-auto px-6 w-full">
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
            Educator Testimonials
          </h2>
          <p
            className={`text-lg max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Hear from educators who are transforming their classrooms with
            Coalight
          </p>
        </motion.div>

        {/* Improved Marquee Container */}
        <div className="relative w-full overflow-hidden">
          <Marquee pauseOnHover className="[--duration:55s] gap-4 py-2">
            {firstRow.map((testimonial, idx) => (
              <div key={idx} className="mx-2">
                <ReviewCard {...testimonial} />
              </div>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:55s] gap-4 py-2">
            {secondRow.map((testimonial, idx) => (
              <div key={idx} className="mx-2">
                <ReviewCard {...testimonial} />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
