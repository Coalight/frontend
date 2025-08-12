import React, { useRef } from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Link, Upload, X, FileText } from "lucide-react";
import { CourseAssetsType } from "@/types/assets";
import { AssetFormProps } from "./types";
import { assetTypes } from "./constants";
import { formatFileSize, validateFileType } from "./utils";
import { toast } from "sonner";

export const AssetForm: React.FC<AssetFormProps> = ({
  formData,
  updateFormData,
  loading,
  onSubmit,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedAssetType = assetTypes.find(
    (type) => type.value === formData.type
  );
  const isFileUpload = selectedAssetType?.isFileUpload || false;
  const acceptedFiles = selectedAssetType?.acceptedFiles || [];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!validateFileType(file, acceptedFiles)) {
        toast.error(
          `Invalid file type. Please select: ${acceptedFiles.join(", ")}`
        );
        return;
      }

      // Validate file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        toast.error("File size must be less than 100MB");
        return;
      }

      updateFormData("file", file);
      // Auto-fill title with filename if empty
      if (!formData.title) {
        updateFormData("title", file.name.split(".")[0]);
      }
    }
  };

  const handleFileRemove = () => {
    updateFormData("file", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!validateFileType(file, acceptedFiles)) {
        toast.error(
          `Invalid file type. Please select: ${acceptedFiles.join(", ")}`
        );
        return;
      }

      if (file.size > 100 * 1024 * 1024) {
        toast.error("File size must be less than 100MB");
        return;
      }

      updateFormData("file", file);
      if (!formData.title) {
        updateFormData("title", file.name.split(".")[0]);
      }
    }
  };

  return (
    <div className="w-full sm:w-2/3 p-8">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          Upload Asset
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="font-semibold">
            Title
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            placeholder="e.g., Lecture Notes Chapter 1"
            required
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type" className="font-semibold">
            Asset Type
          </Label>
          <Select
            value={formData.type}
            onValueChange={(value: CourseAssetsType) => {
              updateFormData("type", value);
              // Reset file when changing type
              updateFormData("file", null);
              updateFormData("url", "");
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            required
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select an asset type" />
            </SelectTrigger>
            <SelectContent>
              {assetTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    <type.icon className="h-4 w-4" />
                    {type.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isFileUpload ? (
          <div className="space-y-2">
            <Label className="font-semibold">File</Label>

            {formData.file ? (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                <FileText className="h-5 w-5 text-blue-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {formData.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(formData.file.size)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleFileRemove}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {acceptedFiles.includes("*/*")
                    ? "Any file type (Max 100MB)"
                    : `${acceptedFiles.join(", ")} (Max 100MB)`}
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept={acceptedFiles.join(",")}
              className="hidden"
              required={!formData.file}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="url" className="font-semibold">
              URL <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => updateFormData("url", e.target.value)}
                placeholder="https://example.com/resource"
                className="bg-background pl-9"
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="description" className="font-semibold">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateFormData("description", e.target.value)}
            placeholder="Provide a brief description of the asset..."
            rows={3}
            className="bg-background resize-none h-24"
          />
        </div>

        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="outline"
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-white w-32"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Upload Asset"
            )}
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
};
