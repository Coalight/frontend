import { CourseAssetsType } from "@/types/assets";

export interface UploadAssetDialogProps {
  courseId: string;
  onAssetUploaded: () => void;
}

export interface AssetFormData {
  title: string;
  description: string;
  type: CourseAssetsType;
  file: File | null;
  url: string;
}

export interface AssetTypeOption {
  value: CourseAssetsType;
  label: string;
  icon: React.ElementType;
  acceptedFiles?: string[];
  isFileUpload: boolean;
}

export interface AssetFormProps {
  formData: AssetFormData;
  updateFormData: (
    key: keyof AssetFormData,
    value: string | CourseAssetsType | File | null
  ) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export interface AssetVisualSidebarProps {
  selectedType: CourseAssetsType;
  file: File | null;
}
