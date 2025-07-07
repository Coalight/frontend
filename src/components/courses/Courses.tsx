"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Folder,
  FolderPlus,
  Grid,
  List,
  Star,
  Users,
  FolderOpen,
  MoreVertical,
  Move,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@radix-ui/react-progress";

type Course = {
  id: string;
  code: string;
  title: string;
  instructor: string;
  enrolled: number;
  pinned: boolean;
  folderId: string | null;
  progress?: number;
  lastAccessed: string;
};

type Folder = {
  id: string;
  name: string;
  parentId: string | null;
  items: number;
  lastUpdated: string;
};

const CoursesPage = () => {
  // Sample data
  const [courses, setCourses] = useState<Course[]>([
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
  ]);

  const [folders, setFolders] = useState<Folder[]>([
    {
      id: "f1",
      name: "Science Courses",
      parentId: null,
      items: 2,
      lastUpdated: "2 days ago",
    },
    {
      id: "f2",
      name: "Mathematics",
      parentId: null,
      items: 3,
      lastUpdated: "1 week ago",
    },
    {
      id: "f3",
      name: "Literature",
      parentId: null,
      items: 1,
      lastUpdated: "3 days ago",
    },
    {
      id: "f4",
      name: "Chemistry",
      parentId: "f1",
      items: 1,
      lastUpdated: "Just now",
    },
  ]);

  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [movingCourse, setMovingCourse] = useState<string | null>(null);

  const currentFolderName = currentFolder
    ? folders.find((f) => f.id === currentFolder)?.name
    : "All Courses";

  const togglePin = (courseId: string) => {
    setCourses(
      courses.map((c) => (c.id === courseId ? { ...c, pinned: !c.pinned } : c))
    );
  };

  const createFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder: Folder = {
      id: `f${Date.now()}`,
      name: newFolderName,
      parentId: currentFolder,
      items: 0,
      lastUpdated: "Just now",
    };

    setFolders([...folders, newFolder]);
    setNewFolderName("");
    setShowCreateFolder(false);
  };

  const moveCourse = (courseId: string, folderId: string | null) => {
    setCourses(
      courses.map((c) => (c.id === courseId ? { ...c, folderId } : c))
    );
    setMovingCourse(null);
  };

  const getCoursesInCurrentFolder = () => {
    if (currentFolder === null) {
      return courses.filter((c) => c.folderId === null);
    }
    return courses.filter((c) => c.folderId === currentFolder);
  };

  const getSubfolders = () => {
    return folders.filter((f) => f.parentId === currentFolder);
  };

  const renderFolderCard = (folder: Folder) => (
    <div
      key={folder.id}
      className="relative group w-[200px] cursor-pointer"
      onClick={() => setCurrentFolder(folder.id)}
    >
      <div className="flex flex-col p-4 border rounded-lg hover:bg-accent transition-colors h-full">
        <div className="flex justify-between items-start mb-3">
          <FolderOpen className="h-10 w-10 text-blue-500" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h3 className="font-medium truncate">{folder.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {folder.items} items
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {folder.lastUpdated}
        </p>
      </div>
    </div>
  );

  const renderCourseCard = (course: Course) => (
    <div key={course.id} className="relative group w-[200px]">
      <div className="flex flex-col p-4 border rounded-lg hover:bg-accent transition-colors h-full">
        <div className="flex justify-between items-start mb-3">
          <BookOpen className="h-10 w-10 text-primary" />
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                togglePin(course.id);
              }}
            >
              <Star
                className={`h-4 w-4 ${
                  course.pinned
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setMovingCourse(course.id)}>
                  <Move className="h-4 w-4 mr-2" /> Move to Folder
                </DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  Archive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-medium truncate">{course.title}</h3>
          <p className="text-sm text-muted-foreground">{course.code}</p>

          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            <span className="truncate">{course.instructor}</span>
          </div>

          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.enrolled} students</span>
          </div>

          {course.progress !== undefined && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          {course.lastAccessed}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6 overflow-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center mb-6 text-sm text-muted-foreground">
          <button
            className="hover:text-primary"
            onClick={() => setCurrentFolder(null)}
          >
            All Courses
          </button>
          {currentFolder && (
            <>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-primary">{currentFolderName}</span>
            </>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{currentFolderName}</h1>
          <div className="flex gap-2">
            <Button onClick={() => setShowCreateFolder(true)}>
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  {viewMode === "list" ? (
                    <List className="h-4 w-4" />
                  ) : (
                    <Grid className="h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setViewMode("list")}>
                  <List className="h-4 w-4 mr-2" /> List View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewMode("grid")}>
                  <Grid className="h-4 w-4 mr-2" /> Grid View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {showCreateFolder && (
          <div className="flex items-center gap-2 mb-6">
            <Input
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createFolder()}
              autoFocus
            />
            <Button onClick={createFolder}>Create</Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateFolder(false);
                setNewFolderName("");
              }}
            >
              Cancel
            </Button>
          </div>
        )}

        {/* Move to Folder Dialog */}
        {movingCourse && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Move to Folder</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => moveCourse(movingCourse, null)}
                >
                  Root Folder
                </Button>
                {folders.map((folder) => (
                  <Button
                    key={folder.id}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => moveCourse(movingCourse, folder.id)}
                  >
                    {folder.name}
                  </Button>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={() => setMovingCourse(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Subfolders Grid */}
        {getSubfolders().length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Folders</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {getSubfolders().map(renderFolderCard)}
            </div>
          </div>
        )}

        {/* Pinned Courses */}
        {getCoursesInCurrentFolder().some((c) => c.pinned) && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500 fill-yellow-500" />
              Pinned Courses
            </h2>
            {viewMode === "list" ? (
              <div className="space-y-2">
                {getCoursesInCurrentFolder()
                  .filter((c) => c.pinned)
                  .map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center p-4 border rounded-lg hover:bg-accent"
                    >
                      <BookOpen className="h-6 w-6 mr-4 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {course.code} • {course.instructor} •{" "}
                          {course.enrolled} students
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={course.progress}
                          className="w-24 h-2"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePin(course.id)}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              course.pinned
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => setMovingCourse(course.id)}
                            >
                              <Move className="h-4 w-4 mr-2" /> Move to Folder
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {getCoursesInCurrentFolder()
                  .filter((c) => c.pinned)
                  .map(renderCourseCard)}
              </div>
            )}
          </div>
        )}

        {/* All Courses */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {currentFolder ? "Courses" : "All Courses"}
          </h2>
          {viewMode === "list" ? (
            <div className="space-y-2">
              {getCoursesInCurrentFolder()
                .filter((c) => !c.pinned)
                .map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center p-4 border rounded-lg hover:bg-accent"
                  >
                    <BookOpen className="h-6 w-6 mr-4 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {course.code} • {course.instructor} • {course.enrolled}{" "}
                        students
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={course.progress} className="w-24 h-2" />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePin(course.id)}
                      >
                        <Star
                          className={`h-4 w-4 ${
                            course.pinned
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => setMovingCourse(course.id)}
                          >
                            <Move className="h-4 w-4 mr-2" /> Move to Folder
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {getCoursesInCurrentFolder()
                .filter((c) => !c.pinned)
                .map(renderCourseCard)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
