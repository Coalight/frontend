"use client";

import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/auth/selectors";
import { formatLongDate, getGreeting } from "@/lib/utils";
import { CreateCourseModal, JoinCourseBtn } from "@/components/courses";

export const Header = () => {
  const user = useAppSelector(selectUser);
  const firstName = user?.name.split(" ")[0] || "";
  return (
    <header className="mb-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {getGreeting(firstName)}
            </h1>
            <p className="text-md text-muted-foreground mt-1">
              {formatLongDate(new Date().toString())}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <JoinCourseBtn />
            <CreateCourseModal />
          </div>
        </div>
      </div>
    </header>
  );
};
