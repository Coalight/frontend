import React from "react";
import {
  AssignmentCard,
  Assignment,
} from "@/components/dashboard/AssignmentCard";

const mockAssignments: Assignment[] = [
  {
    id: 1,
    course: "Math 101",
    title: "Algebra Homework",
    dueDate: "2024-07-10",
    priority: "high",
    updatedAt: "2024-06-20T10:00:00Z",
  },
  {
    id: 2,
    course: "History 201",
    title: "Essay on WW2",
    dueDate: "2024-07-15",
    priority: "medium",
    updatedAt: "2024-06-18T14:30:00Z",
  },
  {
    id: 3,
    course: "Physics 301",
    title: "Lab Report",
    dueDate: "2024-07-12",
    priority: "low",
    updatedAt: "2024-06-19T09:15:00Z",
  },
];

const AssignmentsPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upcoming Assignments</h1>
      {mockAssignments.length > 0 ? (
        <div className="space-y-4">
          {mockAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No upcoming assignments.
        </p>
      )}
    </div>
  );
};

export default AssignmentsPage;
