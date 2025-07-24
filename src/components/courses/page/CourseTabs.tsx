"use client";

import { motion } from "framer-motion";
import { TabType } from "@/types/course";
import { cn } from "@/lib/utils";

const tabs: { id: TabType; label: string }[] = [
  { id: "stream", label: "Stream" },
  { id: "students", label: "Students" },
  { id: "instructors", label: "Instructors" },
  { id: "assignments", label: "Assignments" },
  { id: "about", label: "About" },
];

export function CourseTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}) {
  return (
    <div className="w-full mb-8 ">
      <div className="relative ">
        <div className="flex overflow-x-auto pb-0.5 hide-scrollbar">
          <div className="flex space-x-6 mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-1 py-3 font-medium text-sm transition-all",
                  "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200",
                  activeTab === tab.id
                    ? "text-foreground dark:text-foreground font-medium"
                    : ""
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-[-0.5px] left-0 right-0 h-0.5 bg-foreground dark:bg-foreground"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
