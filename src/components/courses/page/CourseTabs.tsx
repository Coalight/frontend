"use client";

import { motion } from "framer-motion";
import { TabType } from "@/types/course";
import { cn } from "@/lib/utils";

const tabs: { id: TabType; label: string }[] = [
  { id: "main", label: "Main Content" },
  { id: "stream", label: "Stream" },
  { id: "students", label: "Students" },
  { id: "instructors", label: "Instructors" },
  { id: "assignments", label: "Assignments" },
];

export function CourseTabs({ activeTab, setActiveTab }: { 
  activeTab: TabType; 
  setActiveTab: (tab: TabType) => void 
}) {
  return (
    <div className="flex flex-col mb-8">
      <div className="flex overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-4 py-2 rounded-lg font-medium text-sm transition-colors",
                "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                activeTab === tab.id ? "text-blue-600 dark:text-blue-400" : ""
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}