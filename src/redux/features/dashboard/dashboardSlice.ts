import { CourseEvent } from "@/types/event";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Assignment {
  id: number;
  course: string;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  updatedAt: string;
}

interface DashboardState {
  upcomingAssignments: Assignment[];
  upcomingEvents: CourseEvent[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

export const fetchUpcomingAssignments = createAsyncThunk(
  "dashboard/fetchUpcomingAssignments",
  async () => {
    // Mock API call
    const assignments: Assignment[] = [
      {
        id: 1,
        course: "MATH-101",
        title: "Homework 3",
        dueDate: "2023-10-15",
        priority: "high",
        updatedAt: "2023-10-01T12:00:00Z",
      },
      {
        id: 2,
        course: "CS-201",
        title: "Project Proposal",
        dueDate: "2023-10-20",
        priority: "medium",
        updatedAt: "2023-10-02T14:30:00Z",
      },
      {
        id: 3,
        course: "ENG-105",
        title: "Essay Draft",
        dueDate: "2023-10-18",
        priority: "low",
        updatedAt: "2023-10-03T09:15:00Z",
      },
    ];
    await new Promise((resolve) => setTimeout(resolve, 500));
    return assignments;
  }
);

export const fetchUpcomingEvents = createAsyncThunk(
  "dashboard/fetchUpcomingEvents",
  async () => {
    // Mock API call
    const events: CourseEvent[] = [
      {
        id: 1,
        title: "Midterm Exam",
        date: "2023-10-17",
        time: "10:00 AM",
        type: "exam",
        courseCode: "MATH-101",
        courseId: "MATH-101",
        updatedAt: "2023-10-01T12:00:00Z",
        description: "Midterm covering chapters 1-5",
        created_by_Name: "Dr. Johnson",
        created_at: "2023-09-25T10:00:00Z",
      },
      {
        id: 2,
        title: "Guest Lecture on AI",
        date: "2023-10-19",
        time: "2:00 PM",
        type: "lecture",
        courseCode: "CS-201",
        courseId: "CS-201",
        updatedAt: "2023-10-02T14:30:00Z",
        description: "Special lecture on AI by Dr. Smith",
        created_by_Name: "Prof. Anderson",
        created_at: "2023-09-28T09:00:00Z",
      },
      {
        id: 3,
        title: "Writing Skills Workshop",
        date: "2023-10-21",
        time: "11:30 AM",
        type: "workshop",
        courseCode: "ENG-105",
        courseId: "ENG-105",
        updatedAt: "2023-10-03T09:15:00Z",
        description: "Interactive writing skills development session",
        created_by_Name: "Dr. Williams",
        created_at: "2023-09-30T11:30:00Z",
      },
      {
        id: 4,
        title: "Database Design Assignment Due",
        date: "2023-10-22",
        time: "11:59 PM",
        type: "deadline",
        courseCode: "CS-301",
        courseId: "CS-301",
        updatedAt: "2023-10-04T16:20:00Z",
        description: "Submit database design project proposal",
        created_by_Name: "Prof. Garcia",
        created_at: "2023-10-01T14:00:00Z",
      },
      {
        id: 5,
        title: "Team Meeting - Project Alpha",
        date: "2023-10-23",
        time: "3:00 PM",
        type: "meeting",
        courseCode: "MGT-250",
        courseId: "MGT-250",
        updatedAt: "2023-10-05T10:30:00Z",
        description: "Weekly project team meeting",
        created_by_Name: "Dr. Chen",
        created_at: "2023-10-02T08:00:00Z",
      },
      {
        id: 6,
        title: "Final Presentation",
        date: "2023-10-25",
        time: "1:00 PM",
        type: "presentation",
        courseCode: "BUS-400",
        courseId: "BUS-400",
        updatedAt: "2023-10-06T12:15:00Z",
        description: "Final project presentation to industry panel",
        created_by_Name: "Prof. Martinez",
        created_at: "2023-09-15T10:00:00Z",
      },
      {
        id: 7,
        title: "Chemistry Lab Session",
        date: "2023-10-26",
        time: "9:00 AM",
        type: "lab",
        courseCode: "CHEM-201",
        courseId: "CHEM-201",
        updatedAt: "2023-10-07T08:45:00Z",
        description: "Organic chemistry synthesis lab",
        created_by_Name: "Dr. Thompson",
        created_at: "2023-09-20T11:30:00Z",
      },
      {
        id: 8,
        title: "Reading Assignment Discussion",
        date: "2023-10-27",
        time: "10:30 AM",
        type: "discussion",
        courseCode: "HIST-301",
        courseId: "HIST-301",
        updatedAt: "2023-10-08T14:20:00Z",
        description: "Discuss chapters 8-10 from assigned reading",
        created_by_Name: "Prof. Davis",
        created_at: "2023-10-01T16:00:00Z",
      },
      {
        id: 9,
        title: "Quiz - Data Structures",
        date: "2023-10-28",
        time: "11:00 AM",
        type: "quiz",
        courseCode: "CS-202",
        courseId: "CS-202",
        updatedAt: "2023-10-09T09:30:00Z",
        description: "Pop quiz on arrays and linked lists",
        created_by_Name: "Dr. Lee",
        created_at: "2023-10-05T13:00:00Z",
      },
      {
        id: 10,
        title: "Physics Tutorial Session",
        date: "2023-10-29",
        time: "4:00 PM",
        type: "tutorial",
        courseCode: "PHYS-101",
        courseId: "PHYS-101",
        updatedAt: "2023-10-10T11:15:00Z",
        description: "Extra help session for mechanics problems",
        created_by_Name: "TA Wilson",
        created_at: "2023-10-03T15:30:00Z",
      },
      {
        id: 11,
        title: "Course Registration Deadline",
        date: "2023-10-30",
        time: "5:00 PM",
        type: "deadline",
        courseCode: "ADMIN",
        courseId: "ADMIN",
        updatedAt: "2023-10-11T13:45:00Z",
        description: "Last day to register for spring semester",
        created_by_Name: "Registrar Office",
        created_at: "2023-09-01T09:00:00Z",
      },
      {
        id: 12,
        title: "Research Paper Assignment",
        date: "2023-10-31",
        time: "2:00 PM",
        type: "assignment",
        courseCode: "SOC-220",
        courseId: "SOC-220",
        updatedAt: "2023-10-12T16:00:00Z",
        description: "Submit 10-page research paper on social theory",
        created_by_Name: "Dr. Brown",
        created_at: "2023-09-15T12:00:00Z",
      },
    ];
    await new Promise((resolve) => setTimeout(resolve, 500));
    return events;
  }
);

const initialState: DashboardState = {
  upcomingAssignments: [],
  upcomingEvents: [],
  status: "idle",
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingAssignments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpcomingAssignments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upcomingAssignments = action.payload;
      })
      .addCase(fetchUpcomingAssignments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpcomingEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upcomingEvents = action.payload;
      })
      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
