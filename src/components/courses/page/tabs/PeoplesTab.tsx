import { selectCurrentCoursePeople } from "@/redux/features/courses/selectors";
import { useAppSelector } from "@/redux/hooks";
import { Course, EnrolledPeople } from "@/types/course";
import { People } from "./People";
import { PersonStanding } from "lucide-react";

export function PeoplesTab({ course }: { course: Course }) {
  const peoples: EnrolledPeople[] = useAppSelector((state) =>
    selectCurrentCoursePeople(state, course.id)
  );
  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col items-center justify-center  ">
        <div className="space-y-4 w-full">
          {peoples.length > 0 ? (
            [...peoples]
              .sort((a, b) => {
                const roleOrder: Record<string, number> = {
                  INSTRUCTOR: 1,
                  ADMIN: 2,
                  MODERATOR: 3,
                  STUDENT: 4,
                };
                return (roleOrder[a.role] ?? 99) - (roleOrder[b.role] ?? 99);
              })
              .map((per) => <People key={per.id} people={per} />)
          ) : (
            <FallBackPeoples />
          )}
        </div>
      </div>
    </div>
  );
}

function FallBackPeoples() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 text-gray-400 dark:text-gray-500">
          <PersonStanding className="w-12 h-12" />
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          No people assigned to this course
        </p>
      </div>
    </div>
  );
}
