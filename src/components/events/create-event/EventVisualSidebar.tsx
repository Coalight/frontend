import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { EventVisualSidebarProps } from "./types";
import { eventTypes } from "./constants";

export const EventVisualSidebar: React.FC<EventVisualSidebarProps> = ({
  selectedType,
}) => {
  const SelectedIcon =
    eventTypes.find((et) => et.value === selectedType)?.icon || Plus;
  const selectedLabel =
    eventTypes.find((et) => et.value === selectedType)?.label || "New Event";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-1/3 bg-background hidden sm:flex flex-col items-center justify-center p-8 rounded-l-lg border-r border-gray-200 dark:border-gray-700"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 shadow-sm"
      >
        <SelectedIcon className="w-12 h-12 text-gray-800 dark:text-gray-200" />
      </motion.div>

      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-gray-800 dark:text-white text-center"
      >
        {selectedLabel}
      </motion.h2>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center max-w-xs"
      >
        Fill in the event details to schedule it for your course
      </motion.p>
    </motion.div>
  );
};
