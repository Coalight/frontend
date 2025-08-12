"use client";

import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { CourseAssetsType } from "@/types/assets";
import { UploadAssetDialogProps, AssetFormData } from "./types";
import { AssetVisualSidebar } from "./AssetVisualSidebar";
import { AssetForm } from "./AssetForm";
import { isValidUrl } from "./utils";
import { useAssets } from "@/hooks/use-assets";

export function UploadAssetDialog({
  courseId,
  onAssetUploaded,
}: UploadAssetDialogProps) {
  const { uploadAsset, canUpload } = useAssets(courseId);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<AssetFormData>({
    title: "",
    description: "",
    type: "file",
    file: null,
    url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canUpload) {
      toast.error("You don't have permission to upload assets.");
      return;
    }

    const processedData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      url: formData.url.trim(),
    };

    // Validation
    if (!processedData.title || !processedData.type) {
      toast.error("Please fill out all required fields.");
      return;
    }

    // Check if file upload type has file or URL type has URL
    const selectedAssetType = formData.type;
    const isFileUpload = selectedAssetType !== "link";

    if (isFileUpload && !formData.file) {
      toast.error("Please select a file to upload.");
      return;
    }

    if (!isFileUpload && !processedData.url) {
      toast.error("Please enter a valid URL.");
      return;
    }

    if (processedData.url && !isValidUrl(processedData.url)) {
      toast.error("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    try {
      let uploadData;

      if (isFileUpload && formData.file) {
        // Create FormData for file upload
        const formDataObj = new FormData();
        formDataObj.append("file", formData.file);
        formDataObj.append("title", processedData.title);
        formDataObj.append("description", processedData.description);
        formDataObj.append("type", processedData.type);
        formDataObj.append("courseId", courseId);
        uploadData = formDataObj;
      } else {
        // Create JSON data for URL links
        uploadData = {
          title: processedData.title,
          description: processedData.description,
          type: processedData.type,
          courseId,
          url: processedData.url,
        };
      }

      await uploadAsset(uploadData);
      onAssetUploaded();
      setOpen(false);

      // Reset form
      setFormData({
        title: "",
        description: "",
        type: "file",
        file: null,
        url: "",
      });
    } catch (error) {
      console.error("Error uploading asset:", error);
      // Error handling is done in the useAssets hook
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (
    key: keyof AssetFormData,
    value: string | CourseAssetsType | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          disabled={!canUpload}
        >
          <Upload className="h-4 w-4" />
          Upload Asset
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
        <div className="flex">
          <AssetVisualSidebar
            selectedType={formData.type}
            file={formData.file}
          />
          <AssetForm
            formData={formData}
            updateFormData={updateFormData}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
