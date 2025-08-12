import React from "react";
import { EventCard } from "@/components/events/EventCard";
import { CourseEvent } from "@/types/event";

const mockEvents: CourseEvent[] = [
  {
    id: "1",
    title: "Midterm Exam",
    date: "2024-07-05",
    time: "10:00 AM",
    type: "exam",
    courseCode: "Math 101",
    courseId: "math-101",
    updatedAt: "2024-06-20T08:00:00Z",
    created_by_Name: "Dr. Smith",
    created_at: "2024-06-15T08:00:00Z",
  },
  {
    id: "2",
    title: "Guest Lecture: History of Art",
    date: "2024-07-08",
    time: "2:00 PM",
    type: "lecture",
    courseCode: "History 201",
    courseId: "history-201",
    updatedAt: "2024-06-19T15:30:00Z",
    created_by_Name: "Prof. Johnson",
    created_at: "2024-06-14T15:30:00Z",
  },
  {
    id: "3",
    title: "Project Deadline",
    date: "2024-07-12",
    time: "11:59 PM",
    type: "deadline",
    courseCode: "Physics 301",
    courseId: "physics-301",
    updatedAt: "2024-06-18T12:00:00Z",
    created_by_Name: "Dr. Brown",
    created_at: "2024-06-13T12:00:00Z",
  },
  {
    id: "4",
    title: "Team Meeting",
    date: "2024-07-10",
    time: "3:00 PM",
    type: "meeting",
    courseCode: "CS 401",
    courseId: "cs-401",
    updatedAt: "2024-06-17T10:00:00Z",
    created_by_Name: "Prof. Wilson",
    created_at: "2024-06-12T10:00:00Z",
  },
  {
    id: "5",
    title: "Workshop on Data Science",
    date: "2024-07-15",
    time: "1:00 PM",
    type: "workshop",
    courseCode: "Data Sci 101",
    courseId: "data-sci-101",
    updatedAt: "2024-06-16T09:30:00Z",
    created_by_Name: "Dr. Davis",
    created_at: "2024-06-11T09:30:00Z",
  },
  {
    id: "6",
    title: "Assignment Submission",
    date: "2024-07-20",
    time: "5:00 PM",
    type: "assignment",
    courseCode: "Chemistry 201",
    courseId: "chemistry-201",
    updatedAt: "2024-06-15T14:45:00Z",
    created_by_Name: "Prof. Miller",
    created_at: "2024-06-10T14:45:00Z",
  },
  {
    id: "7",
    title: "Project Presentation",
    date: "2024-07-25",
    time: "10:00 AM",
    type: "presentation",
    courseCode: "Biology 301",
    courseId: "biology-301",
    updatedAt: "2024-06-14T11:00:00Z",
    created_by_Name: "Dr. Garcia",
    created_at: "2024-06-09T11:00:00Z",
  },
  {
    id: "8",
    title: "Discussion Session",
    date: "2024-07-30",
    time: "4:00 PM",
    type: "discussion",
    courseCode: "Philosophy 101",
    courseId: "philosophy-101",
    updatedAt: "2024-06-13T13:30:00Z",
    created_by_Name: "Prof. Martinez",
    created_at: "2024-06-08T13:30:00Z",
  },
  {
    id: "9",
    title: "Resource Review",
    date: "2024-08-01",
    time: "9:00 AM",
    type: "resource",
    courseCode: "Finance 201",
    courseId: "finance-201",
    updatedAt: "2024-06-12T16:00:00Z",
    created_by_Name: "Dr. Anderson",
    created_at: "2024-06-07T16:00:00Z",
  },
  {
    id: "10",
    title: "Course Announcement",
    date: "2024-08-05",
    time: "12:00 PM",
    type: "announcement",
    courseCode: "English 101",
    courseId: "english-101",
    updatedAt: "2024-06-11T18:15:00Z",
    created_by_Name: "Prof. Thompson",
    created_at: "2024-06-06T18:15:00Z",
  },
];

const EventsPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      {mockEvents.length > 0 ? (
        <div className="space-y-4">
          {mockEvents.map((event) => (
            <EventCard key={event.id} data={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No upcoming events.</p>
      )}
    </div>
  );
};

export default EventsPage;
