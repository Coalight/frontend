import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Course,
  initialCourses,
} from "@/redux/features/courses/data/coursesData";
import {
  Folder,
  initialFolders,
} from "@/redux/features/courses/data/foldersData";

interface CoursesState {
  courses: Course[];
  folders: Folder[];
  currentFolder: string | null;
  movingCourse: string | null;
  showCreateFolder: boolean;
  navigationHistory: (string | null)[];
  currentHistoryIndex: number;
}

const initialState: CoursesState = {
  courses: initialCourses,
  folders: initialFolders,
  currentFolder: null,
  movingCourse: null,
  showCreateFolder: false,
  navigationHistory: [null],
  currentHistoryIndex: 0,
};

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
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
} = courseSlice.actions;

export default courseSlice.reducer;
