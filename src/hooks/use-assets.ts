import { selectUserRoleInCourse } from "@/redux/features/courses/selectors";
import { useAppSelector } from "@/redux/hooks";
import { CourseAsset, CourseAssetsType } from "@/types/assets";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

type userRoleType = "ADMIN" | "INSTRUCTOR" | "MODERATOR" | "STUDENT";

export interface AssetUploadData {
  title: string;
  description?: string;
  type: CourseAssetsType;
  courseId: string;
  url?: string;
}

interface UseAssetsReturn {
  assets: CourseAsset[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  deleteAsset: (assetId: string | number) => Promise<void>;
  uploadAsset: (data: FormData | AssetUploadData) => Promise<void>;
  canUpload: boolean;
  canDelete: boolean;
  userRole: userRoleType | null;
}

export function useAssets(courseId: string): UseAssetsReturn {
  const [assets, setAssets] = useState<CourseAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userRole = useAppSelector((state) =>
    selectUserRoleInCourse(state, courseId)
  );

  // Permission checks
  const canUpload =
    userRole === "ADMIN" ||
    userRole === "INSTRUCTOR" ||
    userRole === "MODERATOR";

  const canDelete = userRole === "ADMIN" || userRole === "INSTRUCTOR";

  const fetchAssets = useCallback(async () => {
    if (!courseId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/assets/courses?courseId=${courseId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("Failed to fetch assets");
        return;
      }

      const result = await response.json();
      const { data } = result;
      setAssets(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch assets";
      setError(errorMessage);
      setAssets([]);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  const uploadAsset = useCallback(
    async (data: FormData | AssetUploadData) => {
      if (!canUpload) {
        const errorMessage = "You don't have permission to upload assets";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      try {
        const response = await fetch(
          `/api/assets/courses?courseId=${courseId}`,
          {
            method: "POST",
            body: data instanceof FormData ? data : JSON.stringify(data),
            credentials: "include",
            ...(!(data instanceof FormData) && {
              headers: {
                "Content-Type": "application/json",
              },
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to upload asset");
        }

        const result = await response.json();

        // Add new asset to local state
        if (result.data) {
          setAssets((prev) => [result.data, ...prev]);
        }

        toast.success("Asset uploaded successfully");
        return result.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to upload asset";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    [canUpload, courseId]
  );

  const deleteAsset = useCallback(
    async (assetId: string | number) => {
      if (!canDelete) {
        const errorMessage = "You don't have permission to delete assets";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      try {
        const response = await fetch(`/api/assets/${assetId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete asset");
        }

        // Remove asset from local state
        setAssets((prev) => prev.filter((asset) => asset.id !== assetId));
        toast.success("Asset deleted successfully");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete asset";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    [canDelete]
  );

  const refetch = useCallback(() => {
    fetchAssets();
  }, [fetchAssets]);

  // Initial fetch when courseId changes
  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return {
    assets,
    loading,
    error,
    refetch,
    deleteAsset,
    uploadAsset,
    canUpload,
    canDelete,
    userRole,
  };
}
