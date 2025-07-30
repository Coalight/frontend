/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { ChevronRight, FileText } from "lucide-react";
import { UpcomingSection } from "./UpcomingSection";
import { Button } from "../ui/button";
import { IconCalendarEvent } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";
import {
  fetchUpcomingAssignments,
  fetchUpcomingEvents,
} from "@/redux/features/dashboard/dashboardSlice";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AssignmentCard } from "./AssignmentCard";
import { Skeleton } from "../ui/skeleton";
import { EventCard } from "../events/EventCard";

export function UpcomingSections({ children }: { children?: React.ReactNode }) {
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
  );
}
