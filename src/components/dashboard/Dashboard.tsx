"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Flag,
  GraduationCap,
  School,
  PlusCircle,
  ChevronRight,
  Bookmark,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const AcademicDashboard = () => {
  // Academic data
  const enrolledCourses = [
    {
      id: 1,
      code: "MATH-101",
      title: "Calculus I",
      instructor: "Dr. Smith",
      schedule: "Mon/Wed 10:00-11:30",
      progress: 65,
      color: "text-blue-500",
      assignmentsDue: 2,
      updatedAt: "2023-11-10T14:30:00",
    },
    {
      id: 2,
      code: "CS-201",
      title: "Data Structures",
      instructor: "Prof. Johnson",
      schedule: "Tue/Thu 13:00-14:30",
      progress: 42,
      color: "text-emerald-500",
      assignmentsDue: 3,
      updatedAt: "2023-11-09T09:15:00",
    },
    {
      id: 3,
      code: "ENG-105",
      title: "Academic Writing",
      instructor: "Dr. Williams",
      schedule: "Fri 9:00-12:00",
      progress: 88,
      color: "text-violet-500",
      assignmentsDue: 1,
      updatedAt: "2023-11-08T16:45:00",
    },
  ].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const upcomingAssignments = [
    {
      id: 1,
      course: "CS-201",
      title: "Binary Trees Implementation",
      dueDate: "2023-11-15",
      dueTime: "23:59",
      priority: "high",
      status: "pending",
      updatedAt: "2023-11-10T10:00:00",
    },
    {
      id: 2,
      course: "MATH-101",
      title: "Chapter 4 Exercises",
      dueDate: "2023-11-17",
      dueTime: "10:00",
      priority: "medium",
      status: "started",
      updatedAt: "2023-11-09T14:30:00",
    },
    {
      id: 3,
      course: "ENG-105",
      title: "Research Paper Draft",
      dueDate: "2023-11-20",
      dueTime: "17:00",
      priority: "low",
      status: "pending",
      updatedAt: "2023-11-08T08:15:00",
    },
  ].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const upcomingEvents = [
    {
      id: 1,
      title: "Midterm Exam",
      date: "2023-11-22",
      time: "10:00-12:00",
      type: "exam",
      course: "MATH-101",
      updatedAt: "2023-11-10T16:00:00",
    },
    {
      id: 2,
      title: "AI Ethics Lecture",
      date: "2023-11-18",
      time: "14:00-15:30",
      type: "lecture",
      course: "CS-201",
      updatedAt: "2023-11-09T11:30:00",
    },
    {
      id: 3,
      title: "Project Submission",
      date: "2023-11-25",
      time: "23:59",
      type: "deadline",
      course: "CS-201",
      updatedAt: "2023-11-08T09:45:00",
    },
  ].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const stats = [
    {
      label: "Courses",
      value: enrolledCourses.length,
      icon: BookOpen,
      trend: "up",
    },
    { label: "Assignments", value: 6, icon: FileText, trend: "neutral" },
    { label: "Completed", value: 12, icon: CheckCircle, trend: "up" },
    { label: "Pending", value: 3, icon: AlertCircle, trend: "down" },
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTimeSince = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-background">
      {/* Header */}
      <header className="mb-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Academic Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Wednesday, November 8, 2023
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2 rounded-sm">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Calendar</span>
              </Button>
              <Button variant="secondary" className="gap-2 rounded-sm">
                <PlusCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Create Course</span>
              </Button>
            </div>
          </div>

          {/* Responsive Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-secondary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-bold">{stat.value}</p>
                        {stat.trend === "up" && (
                          <span className="text-xs text-emerald-500">↑12%</span>
                        )}
                        {stat.trend === "down" && (
                          <span className="text-xs text-red-500">↓5%</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Enrolled Courses (Wider) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                My Courses
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                See All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {enrolledCourses.slice(0, 4).map((course) => (
                <motion.div
                  key={course.id}
                  whileHover={{ y: -2 }}
                  className="group rounded-lg border p-4 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-md ${course.color} bg-secondary`}
                    >
                      <School className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{course.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {course.code}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {course.instructor}
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5" />
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{course.schedule}</span>
                        </div>
                        <Badge variant="destructive" className="text-xs">
                          {course.assignmentsDue} due
                        </Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Compact Upcoming Items */}
        <div className="space-y-4">
          {/* Compact Upcoming Assignments */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Upcoming Assignments
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                See All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-2">
              {upcomingAssignments.slice(0, 3).map((assignment) => (
                <motion.div
                  key={assignment.id}
                  whileHover={{ x: 2 }}
                  className="p-3 rounded-lg border flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        assignment.priority === "high"
                          ? "bg-red-500/10 text-red-500"
                          : assignment.priority === "medium"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-emerald-500/10 text-emerald-500"
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{assignment.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {assignment.course}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Due {formatDate(assignment.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeSince(assignment.updatedAt)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Compact Upcoming Events */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Events
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                See All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-2">
              {upcomingEvents.slice(0, 3).map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ x: 2 }}
                  className="p-3 rounded-lg border flex items-center gap-3"
                >
                  <div
                    className={`p-2 rounded-full ${
                      event.type === "exam"
                        ? "bg-red-500/10 text-red-500"
                        : event.type === "lecture"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-violet-500/10 text-violet-500"
                    }`}
                  >
                    {event.type === "exam" ? (
                      <Flag className="h-4 w-4" />
                    ) : event.type === "lecture" ? (
                      <GraduationCap className="h-4 w-4" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {event.course}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(event.date)} • {event.time}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeSince(event.updatedAt)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicDashboard;
