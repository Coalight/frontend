import { RootState } from "@redux/store";

export const selectCourses = (state: RootState) => state.courses.courses;



export const selectIsCourseCreationModalOpen = (state: RootState) =>
  state.courses.isCourseCreationModalOpen;

export const selectCourseFetchStatus = (state: RootState) =>
  state.courses.fetchStatus;