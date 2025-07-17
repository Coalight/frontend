
import {CreateCourseModal} from "@/components/courses";

export const Header = () => {
  return (
    <header className="mb-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg md:text-xl font-bold">
             Courses
            </h1>
            
          </div>
          <div className="flex items-center gap-2">
            
            <CreateCourseModal />
          </div>
        </div>
      </div>
    </header>
  );
};
