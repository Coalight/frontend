# Assets Upload - Complete Feature

This feature provides comprehensive asset upload and management functionality for courses, built with a modular architecture similar to the event creation system.

## File Structure

```
src/components/assets/
├── index.ts                    # Main exports
├── UploadAssetDialog.tsx       # Re-export wrapper
├── AssetCard.tsx              # Asset display component
└── upload-asset/              # Core upload functionality
    ├── index.ts                # Upload module exports
    ├── types.ts                # TypeScript interfaces
    ├── constants.ts            # Asset types configuration
    ├── utils.ts                # Helper functions
    ├── UploadAssetDialog.tsx   # Main dialog component
    ├── AssetForm.tsx          # Upload form component
    ├── AssetVisualSidebar.tsx # Visual feedback component
    └── README.md              # Detailed documentation
```

## Features

### 🎯 **Core Functionality**

- **File Upload**: Support for multiple file types with drag-and-drop
- **External Links**: Share web resources and external content
- **Asset Types**: 8 predefined asset categories with custom icons
- **File Validation**: Type and size validation (100MB limit)
- **Visual Feedback**: Dynamic sidebar showing selected type and file info

### 📁 **Supported Asset Types**

1. **General Assets** - Any file type
2. **Presentations** - PPT, PPTX, PDF, KEY files
3. **Documents** - PDF, DOC, DOCX, TXT, RTF files
4. **Spreadsheets** - XLS, XLSX, CSV, ODS files
5. **Videos** - MP4, AVI, MOV, WMV, FLV, WEBM files
6. **Audio** - MP3, WAV, AAC, FLAC, OGG files
7. **External Links** - Web resources (no file upload)
8. **Other** - Any file type with generic handling

### 🛡️ **Security & Validation**

- File type validation against allowed extensions
- File size limits (100MB maximum)
- URL validation for external links
- XSS protection for user inputs
- Secure file handling

### 🎨 **UI/UX Features**

- Drag-and-drop file upload
- Real-time file preview and information
- Type-specific icons and colors
- Responsive design (mobile-friendly)
- Loading states and progress feedback
- Toast notifications for user feedback

## Components

### `UploadAssetDialog`

Main dialog component handling:

- State management
- Form submission logic
- File upload processing
- Error handling and validation

### `AssetForm`

Form component featuring:

- Dynamic fields based on asset type
- File upload with drag-and-drop
- URL input for external links
- Date/time scheduling
- Description and metadata

### `AssetVisualSidebar`

Visual feedback component showing:

- Selected asset type icon
- File information (name, size, type)
- Helpful descriptions and tips
- Dynamic content based on selection

### `AssetCard`

Display component for assets featuring:

- Type-specific icons and colors
- Asset metadata display
- Action buttons (download/external link)
- Course information
- Responsive card layout

## Usage Examples

### Basic Usage

```tsx
import { UploadAssetDialog } from "@/components/assets";

<UploadAssetDialog
  courseId="course-123"
  onAssetUploaded={() => {
    console.log("Asset uploaded successfully!");
    // Refresh asset list, show notification, etc.
  }}
/>;
```

### With Asset Display

```tsx
import { UploadAssetDialog, AssetCard } from "@/components/assets";

// Upload functionality
<UploadAssetDialog courseId={courseId} onAssetUploaded={refreshAssets} />;

// Display assets
{
  assets.map((asset) => <AssetCard key={asset.id} asset={asset} />);
}
```

### Custom Integration

```tsx
import {
  UploadAssetDialog,
  AssetFormData,
  assetTypes,
} from "@/components/assets";

// Access asset types for custom UI
{
  assetTypes.map((type) => (
    <div key={type.value}>
      <type.icon className="w-4 h-4" />
      {type.label}
    </div>
  ));
}
```

## Utility Functions

### File Handling

```tsx
import {
  formatFileSize,
  validateFileType,
  getFileCategory,
} from "@/components/assets/upload-asset";

// Format file size: formatFileSize(1024) -> "1.00 KB"
// Validate file: validateFileType(file, [".pdf", ".doc"])
// Get category: getFileCategory("document.pdf") -> "document"
```

### Form Helpers

```tsx
import {
  isValidUrl,
  getDefaultDate,
  getDefaultTime,
} from "@/components/assets/upload-asset";

// URL validation: isValidUrl("https://example.com")
// Default values: getDefaultDate(), getDefaultTime()
```

## Type Definitions

### Core Types

```tsx
interface AssetFormData {
  title: string;
  description: string;
  type: CourseAssetsType;
  file: File | null;
  url: string;
  date: string;
  time: string;
}

interface UploadAssetDialogProps {
  courseId: string;
  onAssetUploaded: () => void;
}
```

## Integration with Backend

The component is designed to work with a backend API. Key submission data:

```tsx
const submissionData = {
  title: "Lecture Notes",
  description: "Chapter 1 introduction",
  type: "file",
  courseId: "course-123",
  date: "2025-08-09",
  time: "10:00",
  // File upload specific
  fileSize: 1024576,
  fileName: "chapter1.pdf",
  fileType: "application/pdf",
  // OR URL specific
  url: "https://example.com/resource",
};
```

## Styling and Theming

The component uses:

- **Tailwind CSS** for styling
- **shadcn/ui** components for consistent design
- **Dark mode support** via CSS variables
- **Custom color schemes** for different asset types
- **Responsive breakpoints** for mobile optimization

## Error Handling

Comprehensive error handling for:

- Invalid file types
- File size exceeded
- Network upload failures
- URL validation errors
- Required field validation
- Server response errors

## Performance Considerations

- **File size limits** prevent memory issues
- **Lazy loading** for large file lists
- **Optimized re-renders** with proper state management
- **Debounced validation** for better UX
- **Efficient file type detection**

## Accessibility

- **Keyboard navigation** support
- **Screen reader** compatibility
- **Focus management** in modal dialogs
- **ARIA labels** for interactive elements
- **Color contrast** compliance

## Future Enhancements

- **Progress bars** for file uploads
- **Bulk upload** support
- **Asset preview** functionality
- **Version management** for files
- **Asset categories** and tags
- **Search and filtering**
- **Integration with cloud storage**
