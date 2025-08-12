import React from "react";
import { Upload, FileText } from "lucide-react";
import { AssetVisualSidebarProps } from "./types";
import { assetTypes } from "./constants";
import { formatFileSize, getFileCategory } from "./utils";

export const AssetVisualSidebar: React.FC<AssetVisualSidebarProps> = ({
  selectedType,
  file,
}) => {
  const selectedAssetType = assetTypes.find((at) => at.value === selectedType);
  const SelectedIcon = selectedAssetType?.icon || Upload;
  const selectedLabel = selectedAssetType?.label || "Upload Asset";

  const isFileUpload = selectedAssetType?.isFileUpload || false;

  return (
    <div className="w-1/3 bg-blue-50 dark:bg-gray-800 hidden sm:flex flex-col items-center justify-center p-8 rounded-l-lg border-r border-gray-200 dark:border-gray-700">
      <div className="w-24 h-24 bg-blue-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 transition-all duration-300 shadow-sm">
        {file && isFileUpload ? (
          <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        ) : (
          <SelectedIcon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        )}
      </div>

      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center">
        {file && isFileUpload ? file.name : selectedLabel}
      </h2>

      {file && isFileUpload ? (
        <div className="text-center mt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatFileSize(file.size)}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {getFileCategory(file.name)} file
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center">
          {isFileUpload
            ? "Upload a file to share with your course."
            : "Share an external link with your course."}
        </p>
      )}
    </div>
  );
};
