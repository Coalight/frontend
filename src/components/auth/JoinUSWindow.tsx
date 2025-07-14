"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      <div className="w-full max-w-4xl space-y-12">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome to{" "}
            <span className="text-blue-500 dark:text-blue-500">Coalight</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Illuminate your academic journey. Choose your path to begin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Card */}
          <Card
            className="relative group transition-all duration-500
              bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl
              border border-blue-100/40 dark:border-blue-800/40
              hover:shadow-2xl dark:hover:shadow-blue-900/30
              rounded-2xl overflow-hidden"
          >
            <CardHeader className="relative z-10 text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-blue-100/40 dark:bg-blue-900/20 border border-blue-200/40 dark:border-blue-900/30">
                  <GraduationCap className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                I’m a Student
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300 text-sm">
                Discover courses, stay on track, and grow your academic
                potential.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 flex justify-center mt-4">
              <Button
                className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white shadow-md"
                onClick={() => router.push("/signup")}
              >
                Join as Student
              </Button>
            </CardContent>
          </Card>

          {/* Instructor Card */}
          <Card
            className="relative group transition-all duration-500
              bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl
              border border-purple-100/40 dark:border-purple-800/40
              hover:shadow-2xl dark:hover:shadow-purple-900/30
              rounded-2xl overflow-hidden"
          >
            <CardHeader className="relative z-10 text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-purple-100/40 dark:bg-purple-900/20 border border-purple-200/40 dark:border-purple-900/30">
                  <UserCog className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                I’m an Instructor
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300 text-sm">
                Create impactful courses and inspire learners across the
                platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 flex justify-center mt-4">
              <Button
                className="w-full max-w-xs bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white shadow-md"
                onClick={() => router.push("/signup")}
              >
                Join as Instructor
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Already part of Coalight?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-4 hover:underline transition-colors"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
