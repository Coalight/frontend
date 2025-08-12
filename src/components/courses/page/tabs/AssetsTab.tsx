"use client";

import { Course } from "@/types/course";
import { useAssets } from "@/hooks/use-assets";
import { AssetCard } from "@/components/assets/AssetCard";
import { UploadAssetDialog } from "@/components/assets/upload-asset";
import { FolderOpen, Loader2 } from "lucide-react";

export function AssetsTab({ course }: { course: Course }) {
  const { assets, loading, error, refetch, deleteAsset, canUpload, canDelete } =
    useAssets(course.id);

  const userRole = course.currentUserRole;
  const canUploadAssets =
    canUpload &&
    userRole &&
    ["ADMIN", "INSTRUCTOR", "MODERATOR"].includes(userRole);

  const handleDeleteAsset = async (assetId: string | number) => {
    try {
      await deleteAsset(assetId);
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  if (loading) {
    return <AssetsLoadingState />;
  }

  if (error) {
    return <AssetsErrorState error={error} onRetry={refetch} />;
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col items-center justify-center">
        {canUploadAssets && (
          <div className="w-full max-w-4xl mx-auto mb-4">
            <div className="flex justify-end">
              <UploadAssetDialog
                courseId={course.id}
                onAssetUploaded={refetch}
              />
            </div>
          </div>
        )}

        <div className="space-y-4 w-full">
          {assets.length > 0 ? (
            assets.map((asset) => (
              <AssetCard
                key={asset.id}
                data={asset}
                hideCourseCode
                onDelete={canDelete ? handleDeleteAsset : undefined}
                canDelete={canDelete}
                userRole={userRole}
              />
            ))
          ) : (
            <FallBackAssets />
          )}
        </div>
      </div>
    </div>
  );
}

function AssetsLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
      <p className="text-muted-foreground">Loading assets...</p>
    </div>
  );
}

function AssetsErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4 text-red-400">
        <FolderOpen className="h-8 w-8" />
      </div>
      <p className="text-red-500 mb-2">Failed to load assets</p>
      <p className="text-sm text-muted-foreground mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="text-sm text-blue-500 hover:text-blue-600"
      >
        Try again
      </button>
    </div>
  );
}

function FallBackAssets() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4 text-gray-400 dark:text-gray-500">
        <FolderOpen className="h-8 w-8" />
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        Assets will appear here
      </p>
    </div>
  );
}
