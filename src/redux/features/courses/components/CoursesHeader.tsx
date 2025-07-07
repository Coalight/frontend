import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setShowCreateFolder } from "@/redux/features/courses/coursesSlice";
import { selectCurrentFolderName } from "@redux/features/courses/selectors";

export const CoursesHeader = () => {
  const dispatch = useAppDispatch();
  const currentFolderName = useAppSelector(selectCurrentFolderName);

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{currentFolderName}</h1>
      <div className="flex gap-2">
        <Button onClick={() => dispatch(setShowCreateFolder(true))}>
          <FolderPlus className="h-4 w-4 mr-2" />
          New Folder
        </Button>
      </div>
    </div>
  );
};
