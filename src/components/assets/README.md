# Assets Upload - Quick Integration Guide

## 🚀 Quick Start

### 1. Import and Use

```tsx
import { AssetsDemo } from "@/components/assets";

// Simple usage - handles everything automatically
<AssetsDemo courseId="your-course-id" />;
```

### 2. Custom Implementation

```tsx
import { useAssets } from "@/hooks/use-assets";
import { UploadAssetDialog, AssetCard } from "@/components/assets";

function MyAssetsPage({ courseId }: { courseId: string }) {
  const { assets, loading, error, canUpload, canDelete, deleteAsset, refetch } =
    useAssets(courseId);

  return (
    <div>
      {/* Upload button - only shows for authorized users */}
      {canUpload && (
        <UploadAssetDialog courseId={courseId} onAssetUploaded={refetch} />
      )}

      {/* Asset grid */}
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          onDelete={deleteAsset}
          canDelete={canDelete}
        />
      ))}
    </div>
  );
}
```

## 🔐 Role Permissions

| Role       | Upload | Delete | View |
| ---------- | ------ | ------ | ---- |
| Admin      | ✅     | ✅     | ✅   |
| Instructor | ✅     | ✅     | ✅   |
| Moderator  | ✅     | ❌     | ✅   |
| Student    | ❌     | ❌     | ✅   |

## 📁 Supported File Types

- **Documents**: PDF, DOC, DOCX, TXT, RTF
- **Presentations**: PPT, PPTX, KEY
- **Spreadsheets**: XLS, XLSX, CSV, ODS
- **Videos**: MP4, AVI, MOV, WMV, FLV, WEBM
- **Audio**: MP3, WAV, AAC, FLAC, OGG
- **External Links**: Any valid URL
- **General Assets**: Any file type
- **Other**: Catch-all category

## ⚙️ Backend Setup Required

### API Routes Needed

```
GET  /auth/user                    // Get user role
GET  /courses/assets               // Fetch assets
POST /courses/assets               // Upload link assets
POST /courses/assets/upload        // Upload file assets
DELETE /courses/assets/:id         // Delete assets
```

### Environment Variables

```env
EXPRESS_API_BASE_URL=http://localhost:3001/api
```

## 📦 Features Included

### ✅ Core Features

- File upload with drag & drop
- External link sharing
- Role-based access control
- Real-time validation
- Toast notifications
- Loading states
- Error handling
- Delete confirmation

### ✅ Security Features

- File type validation
- File size limits (100MB)
- URL validation
- XSS protection
- Authentication required
- Server-side validation

### ✅ UX Features

- Visual feedback
- Type-specific icons
- Responsive design
- Dark mode support
- Accessibility compliant
- Mobile-friendly

## 🎨 Customization

### Custom Styling

Components use Tailwind CSS and can be customized via:

- CSS classes
- Theme variables
- Component props
- Shadcn/ui component overrides

### Custom Asset Types

Add new asset types in `/src/components/assets/upload-asset/constants.ts`:

```tsx
{
  value: "custom",
  label: "Custom Type",
  icon: MyCustomIcon,
  acceptedFiles: [".custom"],
  isFileUpload: true,
}
```

## 📱 Usage in Different Contexts

### In Course Pages

```tsx
<AssetsDemo courseId={courseId} />
```

### In Modals/Dialogs

```tsx
<UploadAssetDialog
  courseId={courseId}
  onAssetUploaded={() => refetchCourseData()}
/>
```

### In Dashboard

```tsx
const { assets } = useAssets(courseId);
// Display assets in your custom layout
```

## 🔧 Development

### File Structure

```
src/
├── components/assets/           # Main components
│   ├── upload-asset/           # Upload functionality
│   ├── AssetCard.tsx           # Asset display
│   ├── AssetsDemo.tsx          # Demo page
│   └── index.ts                # Exports
├── hooks/use-assets.ts         # API hook
├── types/assets.ts             # Asset types
└── types/api.ts               # API types
```

### API Integration

The system expects RESTful API endpoints with cookie-based authentication. See `API_IMPLEMENTATION.md` for detailed backend requirements.

## 🐛 Common Issues

### 1. Permission Denied

- Check user role in database
- Verify API authentication
- Confirm course membership

### 2. File Upload Fails

- Check file size (max 100MB)
- Verify file type allowed
- Confirm server storage setup

### 3. Assets Not Loading

- Check API endpoint URLs
- Verify CORS configuration
- Confirm authentication cookies

## 🚀 Production Checklist

- [ ] Configure file storage (AWS S3, local, etc.)
- [ ] Set up proper CORS policies
- [ ] Configure secure cookie settings
- [ ] Implement file cleanup on delete
- [ ] Set up monitoring and logging
- [ ] Test all user roles
- [ ] Verify file size limits
- [ ] Test file type validation

## 📞 Support

For issues or questions:

1. Check the `API_IMPLEMENTATION.md` for detailed docs
2. Verify backend API is running
3. Check browser console for errors
4. Confirm user permissions in database

---

**Ready to use!** The Assets Upload system is now fully implemented with production-ready features, security, and user experience considerations.
