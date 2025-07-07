"use client";

import { CoursesHeader } from "@redux/features/courses/components/CoursesHeader";
import { CoursesView } from "@redux/features/courses/components/CoursesView";
import { MoveToFolderDialog } from "@redux/features/courses/components/MoveToFolderDialog";
import { BreadcrumbNavigation } from "@redux/features/courses/components/BreadcrumbNavigation";
import { useAppSelector, useAppDispatch } from "@redux/hooks";
import { selectShowCreateFolder } from "@redux/features/courses/selectors";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  setShowCreateFolder,
  createFolder,
} from "@/redux/features/courses/coursesSlice";
import { useState } from "react";

export const CoursesPage = () => {
  const [newFolderName, setNewFolderName] = useState("");
  const dispatch = useAppDispatch();
  const showCreateFolder = useAppSelector(selectShowCreateFolder);

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const currentFolder = useAppSelector(
      (state) => state.courses.currentFolder
    );
    dispatch(createFolder({ name: newFolderName, parentId: currentFolder }));
    setNewFolderName("");
    dispatch(setShowCreateFolder(false));
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6 overflow-auto">
        <BreadcrumbNavigation />

        <CoursesHeader />

        {showCreateFolder && (
          <div className="flex items-center gap-2 mb-6">
            <Input
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
              autoFocus
            />
            <Button onClick={handleCreateFolder}>Create</Button>
            <Button
              variant="outline"
              onClick={() => {
                dispatch(setShowCreateFolder(false));
                setNewFolderName("");
              }}
            >
              Cancel
            </Button>
          </div>
        )}

        <CoursesView />
        <MoveToFolderDialog />
      </div>
    </div>
  );
};
