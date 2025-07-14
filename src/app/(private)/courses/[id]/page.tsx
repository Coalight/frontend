"use client";

import React, { useState } from "react";
import { ClipboardList, UserPlus, ChartBar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navItems = [
  { id: "stream", label: "Stream", icon: ClipboardList },
  { id: "classwork", label: "Classwork", icon: ClipboardList },
  { id: "people", label: "People", icon: UserPlus },
  { id: "grades", label: "Grades", icon: ChartBar },
];

interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  enrolled: number;
  description: string;
}

const mockCourse: Course = {
  id: "1",
  code: "MATH-101",
  title: "Calculus I",
  instructor: "Dr. Smith",
  enrolled: 24,
  description:
    "This course covers the fundamentals of calculus including limits, derivatives, and integrals. It is designed for students pursuing mathematics, engineering, and sciences.",
};

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState("stream");
  const course = mockCourse;

  return (
    <div className="flex max-w-7xl mx-auto p-6 gap-6">
      {/* Sidebar */}
      <nav className="w-60 flex flex-col border rounded-lg shadow-sm p-4 sticky top-6 h-[calc(100vh-48px)]">
        <h2 className="text-xl font-bold mb-6">{course.title}</h2>
        <ul className="flex flex-col gap-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left font-medium ${
                  activeTab === id
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-muted/50"
                }`}
                onClick={() => setActiveTab(id)}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground mt-1">
            <Badge variant="outline">{course.code}</Badge>
            <span>Instructor: {course.instructor}</span>
            <span>{course.enrolled} students enrolled</span>
          </div>
        </header>

        {/* Tab Content */}
        {activeTab === "stream" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Stream</h2>
            <p className="text-muted-foreground mb-4">
              This is where announcements and posts will appear.
            </p>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-semibold">Welcome to the course!</h3>
                <p className="text-muted-foreground mt-1">
                  Stay tuned for updates and announcements.
                </p>
              </div>
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-semibold">Exam Schedule</h3>
                <p className="text-muted-foreground mt-1">
                  The midterm exam will be held on July 5th at 10:00 AM.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "classwork" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Classwork</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Assignments</h3>
                <p className="text-muted-foreground">
                  List of assignments will be shown here.
                </p>
                <Button variant="outline" className="mt-3" disabled>
                  View All Assignments
                </Button>
              </div>
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Materials</h3>
                <p className="text-muted-foreground">
                  Course materials and resources.
                </p>
                <Button variant="outline" className="mt-3" disabled>
                  View Materials
                </Button>
              </div>
            </div>
          </section>
        )}

        {activeTab === "people" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">People</h2>
            <p className="text-muted-foreground">
              List of students and instructors.
            </p>
            <Button variant="outline" disabled>
              View People
            </Button>
          </section>
        )}

        {activeTab === "grades" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Grades</h2>
            <p className="text-muted-foreground">
              Grades and performance overview.
            </p>
            <Button variant="outline" disabled>
              View Grades
            </Button>
          </section>
        )}
      </main>
    </div>
  );
};

export default CoursePage;
