import {
  FileText,
  Presentation,
  Sheet,
  Link,
  Video,
  Music,
  Upload,
  FolderOpen,
} from "lucide-react";
import { AssetTypeOption } from "./types";

export const assetTypes: AssetTypeOption[] = [
  {
    value: "assets",
    label: "General Assets",
    icon: FolderOpen,
    acceptedFiles: ["*/*"],
    isFileUpload: true,
  },
  {
    value: "slide",
    label: "Presentation/Slides",
    icon: Presentation,
    acceptedFiles: [".ppt", ".pptx", ".pdf", ".key"],
    isFileUpload: true,
  },
  {
    value: "file",
    label: "Document",
    icon: FileText,
    acceptedFiles: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
    isFileUpload: true,
  },
  {
    value: "sheet",
    label: "Spreadsheet",
    icon: Sheet,
    acceptedFiles: [".xls", ".xlsx", ".csv", ".ods"],
    isFileUpload: true,
  },
  {
    value: "video",
    label: "Video",
    icon: Video,
    acceptedFiles: [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm"],
    isFileUpload: true,
  },
  {
    value: "audio",
    label: "Audio",
    icon: Music,
    acceptedFiles: [".mp3", ".wav", ".aac", ".flac", ".ogg"],
    isFileUpload: true,
  },
  {
    value: "link",
    label: "External Link",
    icon: Link,
    acceptedFiles: [],
    isFileUpload: false,
  },
  {
    value: "other",
    label: "Other",
    icon: Upload,
    acceptedFiles: ["*/*"],
    isFileUpload: true,
  },
];
