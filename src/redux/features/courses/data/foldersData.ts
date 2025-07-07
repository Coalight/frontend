export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  items: number;
  lastUpdated: string;
}

export const initialFolders: Folder[] = [
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
];
