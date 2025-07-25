/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { TabType, Course } from "@/types/course";
import { cn } from "@/lib/utils";
import {
  StreamTab,
  StudentsTab,
  PeoplesTab,
  AssignmentsTab,
  AboutTab,
} from "@/components/courses/page/tabs";

// Tab content mapping
const tabComponents: Record<TabType, React.ComponentType<any>> = {
  stream: StreamTab,
  students: StudentsTab,
  peoples: PeoplesTab,
  assignments: AssignmentsTab,
  about: AboutTab,
};

interface TabContentProps {
  tab: TabType;
  course: Course;
}

export function TabContent({ tab, course }: TabContentProps) {
  const TabComponent = tabComponents[tab];
  return (
    <motion.div
      key={tab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "rounded-lg p-2 flex flex-col space-y-2 justify-around items-center",
        "bg-background text-foreground"
      )}
    >
      <TabComponent course={course} />
    </motion.div>
  );
}
