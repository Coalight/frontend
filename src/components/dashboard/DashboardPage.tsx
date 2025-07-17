import { Header } from "./Header";
import { MainContent } from "./MainContent";
import { CourseEnrolled } from "@/components/dashboard/CourseEnrolled";
import { UpcomingSections } from "./UpcomingSections";

export default function DashboardPage() {


  return (
    <div className=" p-4 md:p-6 bg-background">
    
       <Header />
      <MainContent>
        <CourseEnrolled />
        <UpcomingSections />
      </MainContent>
    </div>
  );
}
