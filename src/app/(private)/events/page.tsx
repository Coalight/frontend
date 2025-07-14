import React from "react";
import { EventCard, Event } from "@/components/dashboard/EventCard";

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Midterm Exam",
    date: "2024-07-05",
    time: "10:00 AM",
    type: "exam",
    course: "Math 101",
    updatedAt: "2024-06-20T08:00:00Z",
  },
  {
    id: 2,
    title: "Guest Lecture: History of Art",
    date: "2024-07-08",
    time: "2:00 PM",
    type: "lecture",
    course: "History 201",
    updatedAt: "2024-06-19T15:30:00Z",
  },
  {
    id: 3,
    title: "Project Deadline",
    date: "2024-07-12",
    time: "11:59 PM",
    type: "deadline",
    course: "Physics 301",
    updatedAt: "2024-06-18T12:00:00Z",
  },
];

const EventsPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      {mockEvents.length > 0 ? (
        <div className="space-y-4">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No upcoming events.</p>
      )}
    </div>
  );
};

export default EventsPage;
