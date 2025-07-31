"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Plus, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface JoinCourseBtnProps {
  onJoin?: () => void;
}

export function JoinCourseBtn({ onJoin }: JoinCourseBtnProps) {
  const [open, setOpen] = useState(false);
  const [inputId, setInputId] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async () => {
    if (!inputId.trim()) {
      toast.error("Please enter a valid course ID");
      return;
    }

    setIsJoining(true);

    try {
      const response = await fetch("/api/courses/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ joiningID: inputId.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Successfully joined the course");
        onJoin?.();
        setOpen(false);
      } else {
        toast.error(data.message || "Failed to join course");
      }
    } catch (error) {
      console.error("Error joining course:", error);
      toast.error("An error occurred while joining the course");
    } finally {
      setIsJoining(false);
    }
  };

  const sanitizeInput = (value: string) => {
    return value.replace(/[^a-zA-Z0-9-_]/g, "");
  };

  return (
    <>
      <Button variant="outline" className="gap-2" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Join Course
      </Button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className={cn(
                "relative z-10 w-full max-w-md rounded-lg p-6 shadow-lg",
                "bg-background text-foreground border",
                "dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
              )}
            >
              <Button
                variant="ghost"
                className="size-8 p-0 absolute top-3 right-3 text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                <X className="size-4" />
              </Button>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="size-5 text-primary" />
                  <h3 className="text-xl font-semibold">Join a Course</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseId">Course ID</Label>
                    <Input
                      id="courseId"
                      value={inputId}
                      onChange={(e) =>
                        setInputId(sanitizeInput(e.target.value))
                      }
                      placeholder="e.g. MATH-101-2024"
                      className="focus-visible:ring-2 focus-visible:ring-primary"
                      disabled={isJoining}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter the ID provided by your instructor
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    disabled={isJoining}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleJoin}
                    disabled={!inputId.trim() || isJoining}
                  >
                    {isJoining ? (
                      <>
                        <Loader2 className="size-4 mr-2 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        <Check className="size-4 mr-2" />
                        Join Course
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
