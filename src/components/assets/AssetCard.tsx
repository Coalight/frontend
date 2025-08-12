"use client";

import { motion } from "framer-motion";
import {
  MoreVertical,
  Trash2,
  Edit,
  ExternalLink,
  FileText,
  Presentation,
  Sheet,
  Link,
  Video,
  Music,
  FolderOpen,
  Upload,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  formatShortDate,
  formatTimeSince_new,
  formatToAMPM,
} from "@/lib/utils"; // Assuming these are in your utils
import { CourseAsset, CourseAssetsType as AssetType } from "@/types/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useState } from "react";

const assetIcons: Record<AssetType, React.ReactNode> = {
  assets: <FolderOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  slide: (
    <Presentation className="h-5 w-5 text-orange-600 dark:text-orange-400" />
  ),
  file: <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />,
  sheet: <Sheet className="h-5 w-5 text-green-600 dark:text-green-400" />,
  link: <Link className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
  video: <Video className="h-5 w-5 text-red-600 dark:text-red-400" />,
  audio: <Music className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
  other: <Upload className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
};

const assetTypeClasses: Record<AssetType, string> = {
  assets: "bg-blue-100 dark:bg-blue-900/30",
  slide: "bg-orange-100 dark:bg-orange-900/30",
  file: "bg-gray-100 dark:bg-gray-900/30",
  sheet: "bg-green-100 dark:bg-green-900/30",
  link: "bg-purple-100 dark:bg-purple-900/30",
  video: "bg-red-100 dark:bg-red-900/30",
  audio: "bg-yellow-100 dark:bg-yellow-900/30",
  other: "bg-indigo-100 dark:bg-indigo-900/30",
};

const capitalize = (s: string) => {
  if (typeof s !== "string" || !s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
};

interface AssetCardProps {
  data: CourseAsset;
  hideCourseCode?: boolean;
  userRole?: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "MODERATOR";
  onDelete?: (assetId: string | number) => Promise<void>;
  onEdit?: (asset: CourseAsset) => void;
  canDelete?: boolean;
}

export const AssetCard = ({
  data,
  hideCourseCode = false,
  userRole,
  onDelete,
  onEdit,
}: AssetCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const canModify = userRole && ["ADMIN", "INSTRUCTOR"].includes(userRole);

  const assetType = data.type as AssetType;
  const typeClass = assetTypeClasses[assetType] || assetTypeClasses.other;
  const typeIcon = assetIcons[assetType] || assetIcons.file;
  const isExternalLink = assetType === "link";

  const handleDelete = async () => {
    if (!onDelete) return;

    if (window.confirm(`Are you sure you want to delete "${data.title}"?`)) {
      setIsDeleting(true);
      try {
        await onDelete(data.id);
        toast.success("Asset deleted successfully");
      } catch (error) {
        console.error("Failed to delete asset:", error);
        toast.error("Failed to delete asset.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <motion.div
      whileHover={{ x: 2 }}
      className="group p-3 rounded-lg border flex items-center gap-4 hover:bg-muted/50 max-w-4xl mx-auto"
    >
      {/* Left Icon */}
      <div className={`p-2 rounded-full flex-shrink-0 ${typeClass}`}>
        {typeIcon}
      </div>

      {/* Middle Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{data.title}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {!hideCourseCode && (
            <Badge variant="outline">{data.courseCode}</Badge>
          )}
          <span className="text-xs text-muted-foreground">
            {formatShortDate(data.date)} • {formatToAMPM(data.time)}
          </span>
        </div>
      </div>

      {/* Right Side Actions & Info */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground hidden sm:block">
          {formatTimeSince_new(data.updatedAt)}
        </span>

        {data.url && (
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-muted"
            aria-label={isExternalLink ? "Open link" : "Download file"}
          >
            {isExternalLink ? (
              <ExternalLink className="h-4 w-4" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </a>
        )}

        {canModify && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                disabled={isDeleting}
              >
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(data)}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Badge
          className={`${
            typeClass.replace("bg-", "text-").split(" ")[0]
          } ${typeClass} px-3 py-1 text-xs font-semibold`}
        >
          {capitalize(data.type)}
        </Badge>
      </div>
    </motion.div>
  );
};
