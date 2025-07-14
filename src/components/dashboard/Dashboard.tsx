"use client";

import { useEffect } from "react";
import { FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Header,
  CourseList,
  AssignmentCard,
  EventCard,
  UpcomingSection,
} from "@/components/dashboard";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  fetchUpcomingAssignments,
  fetchUpcomingEvents,
} from "@/redux/features/dashboard/dashboardSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { IconCalendarEvent } from "@tabler/icons-react";

const courseColors = [
  "text-blue-500",
  "text-green-500",
  "text-red-500",
  "text-yellow-500",
  "text-purple-500",
  "text-pink-500",
];

export default function AcademicDashboard() {
  const dispatch = useAppDispatch();
  const enrolledCoursesRaw = useAppSelector(
    (state: RootState) => state.courses.courses
  );
  const {
    upcomingAssignments,
    upcomingEvents,
    status: dashboardStatus,
    error,
  } = useAppSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    if (dashboardStatus === "idle") {
      dispatch(fetchUpcomingAssignments());
      dispatch(fetchUpcomingEvents());
    }
  }, [dashboardStatus, dispatch]);

  // Map courses to expected shape for CourseList with improved colors
  const enrolledCourses = enrolledCoursesRaw.map((course, index) => ({
    id:
      typeof course.id === "string" ? parseInt(course.id) || index : course.id,
    code: course.code,
    title: course.title,
    instructor: course.instructor || "Unknown",
    studentsEnrolled: 0,
    color: courseColors[index % courseColors.length],
  }));

  const renderUpcomingAssignments = () => {
    if (dashboardStatus === "loading") {
      return Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-lg" />
      ));
    }
    if (dashboardStatus === "failed") {
      return <p className="text-red-500">Error: {error}</p>;
    }
    return upcomingAssignments
      .slice(0, 3)
      .map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ));
  };

  const renderUpcomingEvents = () => {
    if (dashboardStatus === "loading") {
      return Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-lg" />
      ));
    }
    if (dashboardStatus === "failed") {
      return <p className="text-red-500">Error: {error}</p>;
    }
    return upcomingEvents
      .slice(0, 3)
      .map((event) => <EventCard key={event.id} event={event} />);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-background">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column - Courses */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
          {enrolledCourses.length > 0 ? (
            <CourseList courses={enrolledCourses} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Upcoming Items */}
        <div className="space-y-6">
          <UpcomingSection
            title="Upcoming Assignments"
            icon={<FileText className="h-5 w-5 text-primary" />}
            viewAllLink={
              <Button variant="link" asChild>
                <Link href="/assignments">View All</Link>
              </Button>
            }
          >
            {renderUpcomingAssignments()}
          </UpcomingSection>

          <UpcomingSection
            title="Upcoming Events"
            icon={<IconCalendarEvent className="h-5 w-5" />}
            viewAllLink={
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                <Link href="/events">
                  See All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            }
          >
            {renderUpcomingEvents()}
          </UpcomingSection>
        </div>
      </div>
    </div>
  );
}
