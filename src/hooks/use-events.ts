import { CourseEvent } from "@/types/event";
import { useState, useEffect, useCallback } from "react";

interface UseEventsReturn {
  events: CourseEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  deleteEvent: (eventId: string | number) => Promise<void>;
}

export function useEvents(courseId: string): UseEventsReturn {
  const [events, setEvents] = useState<CourseEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    if (!courseId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/courses/events?courseId=${courseId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const result = await response.json();
      const { data } = result;
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  const deleteEvent = useCallback(async (eventId: string | number) => {
    try {
      const response = await fetch(`/api/courses/events/${eventId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      // Remove event from local state
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event");
      throw err;
    }
  }, []);

  const refetch = useCallback(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    refetch,
    deleteEvent,
  };
}
