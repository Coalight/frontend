export interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  enrolled: number;
  pinned: boolean;
  folderId: string | null;
  progress?: number;
  lastAccessed: string;
  year?: string;
  duration?: string;
}

export const initialCourses: Course[] = [
  {
    id: "1",
    code: "MATH-101",
    title: "Calculus I",
    instructor: "Dr. Smith",
    enrolled: 24,
    pinned: true,
    folderId: null,
    progress: 65,
    lastAccessed: "2 hours ago",
  },
  {
    id: "2",
    code: "CS-201",
    title: "Data Structures",
    instructor: "Prof. Johnson",
    enrolled: 32,
    pinned: true,
    folderId: null,
    progress: 42,
    lastAccessed: "1 day ago",
  },
  {
    id: "3",
    code: "ENG-105",
    title: "Academic Writing",
    instructor: "Dr. Williams",
    enrolled: 18,
    pinned: false,
    folderId: "f1",
    progress: 88,
    lastAccessed: "3 days ago",
  },
  {
    id: "4",
    code: "PHYS-202",
    title: "Modern Physics",
    instructor: "Dr. Brown",
    enrolled: 15,
    pinned: false,
    folderId: "f1",
    progress: 35,
    lastAccessed: "1 week ago",
  },
  {
    id: "5",
    code: "CHEM-101",
    title: "General Chemistry",
    instructor: "Dr. Lee",
    enrolled: 28,
    pinned: false,
    folderId: "f2",
    progress: 72,
    lastAccessed: "2 days ago",
  },
  {
    id: "6",
    code: "BIO-201",
    title: "Cell Biology",
    instructor: "Dr. Garcia",
    enrolled: 21,
    pinned: false,
    folderId: null,
    progress: 90,
    lastAccessed: "Just now",
  },
];
