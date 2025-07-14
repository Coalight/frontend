/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Course,
  initialCourses,
} from "@/redux/features/courses/data/coursesData";
import {
  Folder,
  initialFolders,
} from "@/redux/features/courses/data/foldersData";
import { CourseCreationFormData, State } from "@/types";
import { toast } from "sonner";

interface CoursesState {
  courses: Course[];
  folders: Folder[];
  currentFolder: string | null;
  movingCourse: string | null;
  showCreateFolder: boolean;
  navigationHistory: (string | null)[];
  currentHistoryIndex: number;
  isCourseCreationModalOpen: boolean;
  new: {
    status: State;
    message: string | null;
  };
}

const initialState: CoursesState = {
  courses: initialCourses,
  folders: initialFolders,
  currentFolder: null,
  movingCourse: null,
  showCreateFolder: false,
  navigationHistory: [null],
  currentHistoryIndex: 0,
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
        return res;
      }
      toast.success("Course created successfully!");
      return await response.json();
    } catch (error: any) {
      toast.error("Something went wrong!");
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
    togglePin: (state, action: PayloadAction<string>) => {
      const course = state.courses.find((c) => c.id === action.payload);
      if (course) {
        course.pinned = !course.pinned;
      }
    },
    setCurrentFolder: (state, action: PayloadAction<string | null>) => {
      const newHistory = [
        ...state.navigationHistory.slice(0, state.currentHistoryIndex + 1),
        action.payload,
      ];

      state.currentFolder = action.payload;
      state.navigationHistory = newHistory;
      state.currentHistoryIndex = newHistory.length - 1;
    },
    navigateBack: (state) => {
      if (state.currentHistoryIndex > 0) {
        state.currentHistoryIndex -= 1;
        state.currentFolder =
          state.navigationHistory[state.currentHistoryIndex];
      }
    },
    navigateForward: (state) => {
      if (state.currentHistoryIndex < state.navigationHistory.length - 1) {
        state.currentHistoryIndex += 1;
        state.currentFolder =
          state.navigationHistory[state.currentHistoryIndex];
      }
    },
    setMovingCourse: (state, action: PayloadAction<string | null>) => {
      state.movingCourse = action.payload;
    },
    moveCourse: (
      state,
      action: PayloadAction<{ courseId: string; folderId: string | null }>
    ) => {
      const course = state.courses.find(
        (c) => c.id === action.payload.courseId
      );
      if (course) {
        course.folderId = action.payload.folderId;
      }
    },
    createFolder: (
      state,
      action: PayloadAction<{ name: string; parentId: string | null }>
    ) => {
      const newFolder: Folder = {
        id: `f${Date.now()}`,
        name: action.payload.name,
        parentId: action.payload.parentId,
        items: 0,
        lastUpdated: "Just now",
      };
      state.folders.push(newFolder);
    },
    setShowCreateFolder: (state, action: PayloadAction<boolean>) => {
      state.showCreateFolder = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      createNewCourse.fulfilled,
      (state, action: PayloadAction<Course>) => {
        state.courses.push(action.payload);
        state.isCourseCreationModalOpen = false;
      }
    );
    builder.addCase(createNewCourse.rejected, (state) => {
      state.new.status = "ERROR";
      state.new.message = "Something went wrong!";
    });
    builder.addCase(createNewCourse.pending, (state) => {
      state.new.status = "LOADING";
    });
  },
});

export const {
  togglePin,
  setCurrentFolder,
  setMovingCourse,
  moveCourse,
  createFolder,
  setShowCreateFolder,
  navigateBack,
  navigateForward,
  setIsCourseCreationModalOpen,
} = courseSlice.actions;

export default courseSlice.reducer;
