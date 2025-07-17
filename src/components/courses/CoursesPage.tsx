import { CourseList, Header,MainContent } from "@/components/courses";

const CoursesPage = () => {
 

  return (
    <div className=" p-4 md:p-6 bg-background8">
      <Header />
      <MainContent><CourseList /></MainContent>
      
    </div>
  );
};

export default CoursesPage;
