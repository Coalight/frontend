import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  moveCourse,
  setMovingCourse,
} from "@/redux/features/courses/coursesSlice";
import { selectFolders } from "@redux/features/courses/selectors";

export const MoveToFolderDialog = () => {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFolders);
  const movingCourse = useAppSelector((state) => state.courses.movingCourse);

  if (!movingCourse) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Move to Folder</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              dispatch(moveCourse({ courseId: movingCourse, folderId: null }));
              dispatch(setMovingCourse(null));
            }}
          >
            Root Folder
          </Button>
          {folders.map((folder) => (
            <Button
              key={folder.id}
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                dispatch(
                  moveCourse({ courseId: movingCourse, folderId: folder.id })
                );
                dispatch(setMovingCourse(null));
              }}
            >
              {folder.name}
            </Button>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            onClick={() => dispatch(setMovingCourse(null))}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
