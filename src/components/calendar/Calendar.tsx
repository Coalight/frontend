"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function CalendarPage() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="flex flex-col h-full p-6 space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          November 2023
        </motion.h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            Today
          </Button>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button size="sm" className="ml-4 h-9">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-hidden"
      >
        <Card className="h-full border-0 shadow-none">
          <CardHeader className="pb-1 px-0">
            <div className="grid grid-cols-7 gap-1 text-center">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-sm font-medium text-muted-foreground py-2 tracking-wider"
                >
                  {day}
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-40px)]">
            <div className="grid grid-cols-7 auto-rows-fr gap-1 h-full">
              {days.map((day) => (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.02 }}
                  className={`
                    relative min-h-[120px] p-2 rounded-lg border
                    ${
                      day === 15
                        ? "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-900/20"
                        : "border-transparent bg-muted/20 hover:bg-muted/40"
                    }
                    transition-colors duration-200
                  `}
                >
                  <div className="flex flex-col h-full">
                    <span
                      className={`
                      self-end text-lg font-medium
                      ${
                        day === 15
                          ? "text-blue-600 dark:text-blue-300"
                          : "text-foreground/80"
                      }
                    `}
                    >
                      {day}
                    </span>

                    {/* Sample Events */}
                    <div className="mt-1 space-y-1 flex-1 overflow-y-auto">
                      {day === 15 && (
                        <>
                          <div className="text-xs p-2 rounded-lg bg-green-500/90 text-white font-medium">
                            Team Meeting · 10 AM
                          </div>
                          <div className="text-xs p-2 rounded-lg bg-purple-500/90 text-white font-medium">
                            Project Deadline
                          </div>
                        </>
                      )}
                      {day === 20 && (
                        <div className="text-xs p-2 rounded-lg bg-blue-500/90 text-white font-medium">
                          Client Call · 2 PM
                        </div>
                      )}
                    </div>
                  </div>

                  {day === 15 && (
                    <div className="absolute top-1 right-1 text-xs px-2 py-0.5 rounded-full bg-blue-500 text-white">
                      Today
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
