"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";

type CourseInfo = {
  id: string;
  title: string;
  instructor: string;
  thumbnail?: string;
};

export default function CourseJoinPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const courseID = params.courseID as string;
  const urlJoiningCode = searchParams.get("code") || "";

  const [joiningCode, setJoiningCode] = useState(urlJoiningCode);
  const [course, setCourse] = useState<CourseInfo | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "verifying" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  // Fetch course info on mount
  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        setStatus("loading");
        // Mock API call - replace with actual fetch
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock response - replace with actual API call
        const mockCourse = {
          id: courseID,
          title: "Advanced React Development",
          instructor: "Jane Doe",
          thumbnail: "/course-placeholder.jpg",
        };

        setCourse(mockCourse);
        setStatus("idle");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setStatus("error");
        setError("Failed to load course information");
        toast.error("Failed to load course information");
      }
    };

    if (courseID) fetchCourseInfo();
  }, [courseID]);

  const handleJoinCourse = async () => {
    if (!joiningCode) {
      setError("Please enter a joining code");
      return;
    }

    try {
      setStatus("verifying");
      // Mock verification - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock verification - replace with actual check
      const isValid = joiningCode === "VALIDCODE" || Math.random() > 0.5;

      if (isValid) {
        setStatus("success");
        toast.success("Successfully joined the course!");

        // Redirect after 1.5 seconds
        setTimeout(() => {
          router.push(`/courses/${courseID}`);
        }, 1500);
      } else {
        throw new Error("Invalid joining code");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Verification failed");
      toast.error(error || "Verification failed");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === "error" && !course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Course Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">
              The requested course could not be found.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/")}>Back to Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4"
    >
      <Card className="w-full max-w-md overflow-hidden">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {status === "success" ? "Success!" : "Join Course"}
            </CardTitle>
            <CardDescription>
              {status === "success"
                ? "You've successfully joined the course!"
                : course?.title}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center py-4"
              >
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <p className="text-center">Redirecting to course...</p>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-medium">{course?.title}</h3>
                    <p className="text-sm text-gray-500">
                      Instructor: {course?.instructor}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="joiningCode" className="text-sm font-medium">
                    Joining Code
                  </label>
                  <Input
                    id="joiningCode"
                    value={joiningCode}
                    onChange={(e) => setJoiningCode(e.target.value)}
                    placeholder="Enter course joining code"
                    className={error ? "border-destructive" : ""}
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>
              </>
            )}
          </CardContent>

          {status !== "success" && (
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/")}>
                Cancel
              </Button>
              <Button
                onClick={handleJoinCourse}
                disabled={status === "verifying"}
              >
                {status === "verifying" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Join Course <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          )}
        </motion.div>
      </Card>
    </motion.div>
  );
}
