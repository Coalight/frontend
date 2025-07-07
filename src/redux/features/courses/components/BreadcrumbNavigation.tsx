import { ChevronRight, ChevronLeft, Home } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  setCurrentFolder,
  navigateBack,
  navigateForward,
} from "@/redux/features/courses/coursesSlice";
import {
  selectFolders,
  selectNavigationHistory,
  selectCurrentHistoryIndex,
} from "@redux/features/courses/selectors";
import { Button } from "@/components/ui/button";

export const BreadcrumbNavigation = () => {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFolders);
  const history = useAppSelector(selectNavigationHistory);
  const currentIndex = useAppSelector(selectCurrentHistoryIndex);

  const getFolderName = (id: string | null) => {
    if (id === null) return "All Courses";
    const folder = folders.find((f) => f.id === id);
    return folder?.name || "Unknown";
  };

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled={!canGoBack}
          onClick={() => dispatch(navigateBack())}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled={!canGoForward}
          onClick={() => dispatch(navigateForward())}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => dispatch(setCurrentFolder(null))}
        >
          <Home className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center overflow-x-auto py-2 scrollbar-hide">
        {history.slice(0, currentIndex + 1).map((folderId, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            )}
            <button
              className={`text-sm whitespace-nowrap ${
                index === currentIndex
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => {
                dispatch(setCurrentFolder(folderId));
                // Truncate history if clicking on a previous item
                if (index < currentIndex) {
                  dispatch(navigateBack());
                }
              }}
            >
              {getFolderName(folderId)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
