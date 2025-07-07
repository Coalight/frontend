import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  BookOpenText,
  Users,
  CalendarDays,
  MoveUpRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/redux/hooks";
import {
  togglePin,
  setMovingCourse,
} from "@/redux/features/courses/coursesSlice";
import { Course } from "../data/coursesData";

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <Card className="w-[380px] relative rounded-md border border-t-0 bg-card text-card-foreground shadow-sm transition-all hover:shadow-md dark:shadow-neutral-800/50">
      <TopBorderAccent />
      <div className="absolute top-3 right-3 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(togglePin(course.id))}
          className="text-muted-foreground hover:text-yellow-500"
        >
          <Star
            className={`h-4 w-4 ${
              course.pinned ? "fill-yellow-400 text-yellow-400" : ""
            }`}
          />
        </Button>
      </div>
      <CourseCardBody>
        <CourseCardHeader title={course.title} link={`/courses/${course.id}`} />
        <CourseCardContent
          courseCode={course.code}
          numberOfStudents={course.enrolled}
          year={course.year}
          duration={course.duration}
        />
        <CourseCardFooter level="Graduate level" />
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-muted-foreground">
            Last accessed: {course.lastAccessed}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                Move to Folder
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => dispatch(setMovingCourse(course.id))}
              >
                Change Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CourseCardBody>
    </Card>
  );
};

const TopBorderAccent = () => {
  return (
    <div className="h-[2px] w-full absolute top-0 left-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent dark:via-blue-400" />
  );
};

const CourseCardBody = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-6 py-5">{children}</div>;
};

const CourseCardHeader = ({ title, link }: { title: string; link: string }) => {
  return (
    <Link href={link} className="no-underline">
      <CardHeader className="p-0 mb-0 group relative">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-medium tracking-tight leading-snug text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <MoveUpRight className="absolute right-0 top-0 h-5 w-5 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        </div>
        <div className="w-16 h-[1.5px] my-2 bg-blue-200 dark:bg-blue-500/70 rounded-full" />
      </CardHeader>
    </Link>
  );
};

const CourseCardFooter = ({ level = "Graduate level" }: { level?: string }) => {
  return (
    <CardFooter className="p-0 mt-2">
      <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
        {level}
      </span>
    </CardFooter>
  );
};

const CourseCardContent = ({
  courseCode,
  numberOfStudents,
  year,
  duration,
}: {
  courseCode: string;
  numberOfStudents: number;
  year?: string;
  duration?: string;
}) => {
  return (
    <CardContent className="p-0 my-4 space-y-1 text-sm">
      <div className="flex items-center gap-3 text-muted-foreground">
        <BookOpenText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <span>{courseCode}</span>
      </div>
      <div className="flex items-center gap-3 text-muted-foreground">
        <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <span>{numberOfStudents} students enrolled</span>
      </div>
      <div className="flex items-center gap-3 text-muted-foreground">
        <CalendarDays className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <span>{`Fall ${year} • ${duration}`}</span>
      </div>
    </CardContent>
  );
};
