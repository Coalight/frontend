import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Assignment {
  id: number;
  course: string;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  updatedAt: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: "exam" | "lecture" | "deadline";
  courseCode: string;
  updatedAt: string;
}

interface DashboardState {
  upcomingAssignments: Assignment[];
  upcomingEvents: Event[];
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
    const events: Event[] = [
      {
        id: 1,
        title: "Midterm Exam",
        date: "2023-10-10",
        time: "10:00 AM",
        type: "exam",
        courseCode: "MATH-101",
        updatedAt: "2023-10-01T08:00:00Z",
      },
      {
        id: 2,
        title: "Guest Lecture on AI",
        date: "2023-10-12",
        time: "2:00 PM",
        type: "lecture",
        courseCode: "CS-201",
        updatedAt: "2023-10-02T11:30:00Z",
      },
      {
        id: 3,
        title: "Project Deadline",
        date: "2023-10-15",
        time: "5:00 PM",
        type: "deadline",
        courseCode: "ENG-105",
        updatedAt: "2023-10-03T13:45:00Z",
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
