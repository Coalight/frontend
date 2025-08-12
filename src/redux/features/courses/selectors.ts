import { RootState } from "@redux/store";

export const selectCourses = (state: RootState) => state.courses.courses;

export const selectIsCourseCreationModalOpen = (state: RootState) =>
  state.courses.isCourseCreationModalOpen;

export const selectCourseFetchStatus = (state: RootState) =>
  state.courses.fetchStatus;

export const selectCurrentCourse = (state: RootState, courseId: string) =>
  state.courses.courses?.find((course) => course.id === courseId);

export const selectCurrentCoursePeople = (
  state: RootState,
  courseId: string
) => {
  const course = state.courses.courses?.find(
    (course) => course.id === courseId
  );
  return course?.Peoples || [];
};

export const selectUserRoleInCourse = (state: RootState, courseId: string) => {
  const course = state.courses.courses?.find(
    (course) => course.id === courseId
  );
  return course?.currentUserRole || null;
};
