import { RootState } from "@redux/store";

export const selectCourses = (state: RootState) => state.courses.courses;
export const selectFolders = (state: RootState) => state.courses.folders;
export const selectCurrentFolder = (state: RootState) =>
  state.courses.currentFolder;
export const selectMovingCourse = (state: RootState) =>
  state.courses.movingCourse;
export const selectShowCreateFolder = (state: RootState) =>
  state.courses.showCreateFolder;

export const selectCoursesInCurrentFolder = (state: RootState) => {
  const currentFolder = state.courses.currentFolder;
  return state.courses.courses.filter((c) => c.folderId === currentFolder);
};

export const selectSubfolders = (state: RootState) => {
  const currentFolder = state.courses.currentFolder;
  return state.courses.folders.filter((f) => f.parentId === currentFolder);
};

export const selectCurrentFolderName = (state: RootState) => {
  const currentFolder = state.courses.currentFolder;
  if (!currentFolder) return "All Courses";
  const folder = state.courses.folders.find((f) => f.id === currentFolder);
  return folder?.name || "All Courses";
};

export const selectNavigationHistory = (state: RootState) =>
  state.courses.navigationHistory;
export const selectCurrentHistoryIndex = (state: RootState) =>
  state.courses.currentHistoryIndex;

export const selectIsCourseCreationModalOpen = (state: RootState) =>
  state.courses.isCourseCreationModalOpen;
