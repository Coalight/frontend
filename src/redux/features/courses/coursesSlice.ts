/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CourseCreationFormData, State } from "@/types";
import { toast } from "sonner";
import { Course } from "@/types/course";

interface CoursesState {
  courses: Course[] | null;
  fetchStatus: State;
  isCourseCreationModalOpen: boolean;
  new: {
    status: State;
    message: string | null;
  };
}

const initialState: CoursesState = {
  courses: null,
  fetchStatus: "IDLE",
  isCourseCreationModalOpen: false,
  new: {
    status: "IDLE",
    message: null,
  },
};
export const createNewCourse = createAsyncThunk(
  "courses/createNewCourse",
  async (courseData: Partial<CourseCreationFormData>, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/courses/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) {
        const res = await response.json();
        toast.error(res.message || "Something went wrong!");
        return rejectWithValue(res);
      }
      toast.success("Course created successfully!");
      return await response.json();
    } catch (error: any) {
      toast.error("Something went wrong!");
      return rejectWithValue(error.message);
    }
  }
);

export const getEnrolledCourses = createAsyncThunk(
  "courses/getEnrolledCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/courses/all");
      if (!response.ok) {
        const res = await response.json();
        toast.error(res.message || "Failed to fetch enrolled courses.");
        return rejectWithValue(res);
      }
      const {data , count , success} = await response.json();
      if (!success  ) {
        toast.error("Failed to fetch enrolled courses.");
        return rejectWithValue("Failed to fetch enrolled courses.");
      }
      if(count === 0) {
        toast.info("You are not enrolled in any courses.");
      }

      return data as Course[];
    } catch (error: any) {
      toast.error("Failed to fetch enrolled courses.");
      return rejectWithValue(error.message);
    }
  }
);
export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setIsCourseCreationModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCourseCreationModalOpen = action.payload;
    },
   
   
  },

  extraReducers: (builder) => {
    builder
    .addCase(
      createNewCourse.fulfilled,
      (state, action: PayloadAction<any>) => {
        const { course } = action.payload;
        if (!state.courses) {
          state.courses = [course];
        } else {
          state.courses.push(course);
        }
        state.isCourseCreationModalOpen = false;
      }
    )
    .addCase(createNewCourse.rejected, (state) => {
      state.new.status = "ERROR";
      state.new.message = "Something went wrong!";
    })
    .addCase(createNewCourse.pending, (state) => {
      state.new.status = "LOADING";
    })

    // all courses
    .addCase(getEnrolledCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
      state.fetchStatus = "SUCCESS";
    })
    .addCase(getEnrolledCourses.rejected, (state) => {
      state.fetchStatus = "ERROR";
      toast.error("Failed to fetch enrolled courses.");
    })
    .addCase(getEnrolledCourses.pending, (state) => {
      state.fetchStatus = "LOADING";
    } );
  },
});

export const {
  setIsCourseCreationModalOpen,

} = courseSlice.actions;

export default courseSlice.reducer;
