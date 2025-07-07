import { FolderOpen, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/redux/hooks";
import { setCurrentFolder } from "@/redux/features/courses/coursesSlice";

interface FolderCardProps {
  folder: {
    id: string;
    name: string;
    items: number;
    lastUpdated: string;
  };
}

export const FolderCard = ({ folder }: FolderCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="relative group w-[200px] cursor-pointer">
      <div
        className="flex flex-col p-4 border rounded-lg hover:bg-accent transition-colors h-full"
        onClick={() => dispatch(setCurrentFolder(folder.id))}
      >
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
      </div>
    </div>
  );
};
