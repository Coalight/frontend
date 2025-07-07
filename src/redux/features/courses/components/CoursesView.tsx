import { useAppSelector } from "@redux/hooks";
import {
  selectCoursesInCurrentFolder,
  selectSubfolders,
} from "@redux/features/courses/selectors";
import { CourseCard } from "./CourseCard";
import { FolderCard } from "./FolderCard";
import { Star } from "lucide-react";

export const CoursesView = () => {
  const subfolders = useAppSelector(selectSubfolders);
  const courses = useAppSelector(selectCoursesInCurrentFolder);

  return (
    <div className="space-y-8">
      {/* Subfolders Grid */}
      {subfolders.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Folders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {subfolders.map((folder) => (
              <FolderCard key={folder.id} folder={folder} />
            ))}
          </div>
        </div>
      )}

      {/* Pinned Courses */}
      {courses.some((c) => c.pinned) && (
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            Pinned Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses
              .filter((c) => c.pinned)
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </div>
      )}

      {/* All Courses */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          {courses.some((c) => c.pinned) ? "Other Courses" : "All Courses"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses
            .filter((c) => !c.pinned)
            .map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
        </div>
      </div>
    </div>
  );
};
