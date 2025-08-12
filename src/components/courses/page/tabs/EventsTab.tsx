"use client";

import { EnhancedEventCard } from "@/components/events/EnhancedEventCard";
import { CreateEventDialog } from "@/components/events/create-event";
import { Course } from "@/types/course";
import { CourseEvent } from "@/types/event";
import { Calendar, Loader2 } from "lucide-react";
import { useEvents } from "@/hooks/use-events";

export function EventsTab({ course }: { course: Course }) {
  const { events, loading, error, refetch, deleteEvent } = useEvents(course.id);

  const userRole = course.currentUserRole;
  const canCreateEvents =
    userRole && ["ADMIN", "INSTRUCTOR", "MODERATOR"].includes(userRole);

  const handleDeleteEvent = async (eventId: string | number) => {
    try {
      await deleteEvent(eventId);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEditEvent = (event: CourseEvent) => {
    // TODO: Implement edit functionality if needed
    console.log("Edit event:", event);
  };

  if (loading) {
    return <EventsLoadingState />;
  }

  if (error) {
    return <EventsErrorState error={error} onRetry={refetch} />;
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col items-center justify-center">
        {canCreateEvents && (
          <div className="w-full max-w-4xl mx-auto mb-4">
            <div className="flex justify-end">
              <CreateEventDialog
                courseId={course.id}
                onEventCreated={refetch}
              />
            </div>
          </div>
        )}

        <div className="space-y-4 w-full">
          {events.length > 0 ? (
            events.map((event) => (
              <EnhancedEventCard
                key={event.id}
                data={event}
                hideCourseCode
                userRole={userRole}
                onDelete={handleDeleteEvent}
                onEdit={(event) => handleEditEvent(event)}
              />
            ))
          ) : (
            <FallBackEventsTab />
          )}
        </div>
      </div>
    </div>
  );
}

function EventsLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
      <p className="text-muted-foreground">Loading events...</p>
    </div>
  );
}

function EventsErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4 text-red-400">
        <Calendar className="h-8 w-8" />
      </div>
      <p className="text-red-500 mb-2">Failed to load events</p>
      <p className="text-sm text-muted-foreground mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="text-sm text-blue-500 hover:text-blue-600"
      >
        Try again
      </button>
    </div>
  );
}

function FallBackEventsTab() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4 text-gray-400 dark:text-gray-500">
        <Calendar className="h-8 w-8" />
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        Events will appear here
      </p>
    </div>
  );
}
