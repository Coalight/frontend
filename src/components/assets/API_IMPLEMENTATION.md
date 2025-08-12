# Assets Upload API Implementation

## Overview

This implementation provides a complete Assets Upload functionality with role-based access control, real API integration, and comprehensive error handling. The system allows Admin, Instructor, and Moderator users to upload assets, while only Admin and Instructor users can delete them.

## Role-Based Access Control

### Upload Permissions

- ✅ **Admin**: Full access - upload/delete
- ✅ **Instructor**: Full access - upload/delete
- ✅ **Moderator**: Limited access - upload only
- ❌ **Student**: No access - view only

### Permission Matrix

| Role       | View | Upload | Delete |
| ---------- | ---- | ------ | ------ |
| Admin      | ✅   | ✅     | ✅     |
| Instructor | ✅   | ✅     | ✅     |
| Moderator  | ✅   | ✅     | ❌     |
| Student    | ✅   | ❌     | ❌     |

## API Routes

### 1. Assets CRUD Operations

#### GET `/api/courses/assets`

**Purpose**: Fetch all assets for a course
**Parameters**:

- `courseId` (query parameter)
  **Authentication**: Required (cookie-based)
  **Response**: Array of CourseAsset objects

#### POST `/api/courses/assets`

**Purpose**: Upload a new asset (file or external link)
**Content Types**:

- `multipart/form-data` (for file uploads)
- `application/json` (for external links)
  **Authentication**: Required (Admin/Instructor/Moderator only)
  **Response**: Created asset object

#### DELETE `/api/courses/assets/[id]`

**Purpose**: Delete an asset
**Parameters**:

- `id` (path parameter)
  **Authentication**: Required (Admin/Instructor only)
  **Response**: Success confirmation

#### GET `/api/courses/assets/[id]`

**Purpose**: Get a specific asset
**Parameters**:

- `id` (path parameter)
  **Authentication**: Required
  **Response**: Asset object

#### PATCH `/api/courses/assets/[id]`

**Purpose**: Update an asset
**Parameters**:

- `id` (path parameter)
  **Body**: Updated asset fields
  **Authentication**: Required (Admin/Instructor only)
  **Response**: Updated asset object

### 2. User Authentication

#### GET `/api/user`

**Purpose**: Get current user information and role
**Authentication**: Required (cookie-based)
**Response**: User object with role and permissions

## Hook Implementation

### `useAssets(courseId: string)`

**Purpose**: Custom hook for managing course assets with API integration

**Returns**:

```typescript
interface UseAssetsReturn {
  assets: CourseAsset[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  deleteAsset: (assetId: string | number) => Promise<void>;
  uploadAsset: (data: FormData | AssetUploadData) => Promise<void>;
  canUpload: boolean;
  canDelete: boolean;
  userRole: UserRole | null;
}
```

**Features**:

- Automatic permission checking
- Real-time error handling with toast notifications
- Loading states management
- Optimistic updates for better UX
- Automatic refetching after mutations

## Component Updates

### 1. UploadAssetDialog

- ✅ Integrated with `useAssets` hook
- ✅ Real API calls instead of mock data
- ✅ Role-based UI (button disabled for unauthorized users)
- ✅ Proper FormData handling for file uploads
- ✅ JSON data for external links
- ✅ Comprehensive error handling

### 2. AssetCard

- ✅ Delete functionality with dropdown menu
- ✅ Permission-based action buttons
- ✅ Loading states during operations
- ✅ Confirmation dialog for destructive actions
- ✅ Toast notifications for user feedback

### 3. AssetsDemo

- ✅ Real API integration
- ✅ Loading and error states
- ✅ Role-based UI rendering
- ✅ Auto-refresh after operations
- ✅ Empty state handling

## Security Features

### 1. Authentication

- Cookie-based session management
- Automatic token handling
- Credential inclusion in all requests

### 2. Authorization

- Role-based access control at API level
- Frontend permission checks for UI
- Server-side validation for all operations

### 3. File Upload Security

- File type validation
- File size limits (100MB maximum)
- XSS protection for user inputs
- Secure file handling

### 4. Input Validation

- Client-side validation for immediate feedback
- Server-side validation for security
- URL validation for external links
- Required field validation

## Error Handling

### 1. Network Errors

- Automatic retry mechanisms
- User-friendly error messages
- Toast notifications for feedback
- Graceful degradation

### 2. Permission Errors

- Clear messaging for unauthorized actions
- UI elements disabled/hidden appropriately
- Proper HTTP status code handling

### 3. Validation Errors

- Real-time validation feedback
- Form field highlighting
- Detailed error descriptions

## Usage Examples

### Basic Usage

```tsx
import { AssetsDemo } from "@/components/assets";

<AssetsDemo courseId="your-course-id" />;
```

### Custom Integration

```tsx
import { useAssets } from "@/hooks/use-assets";
import { UploadAssetDialog, AssetCard } from "@/components/assets";

function MyAssetsPage({ courseId }: { courseId: string }) {
  const { assets, loading, error, canUpload, canDelete, deleteAsset } =
    useAssets(courseId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {canUpload && (
        <UploadAssetDialog courseId={courseId} onAssetUploaded={() => {}} />
      )}

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

## Backend Requirements

The frontend expects the following backend endpoints:

### Express.js Routes (Expected)

```javascript
// Get user role and permissions
GET /auth/user

// Assets CRUD
GET /courses/assets?courseID=:id
POST /courses/assets (JSON data for links)
POST /courses/assets/upload (FormData for files)
DELETE /courses/assets/:id
GET /courses/assets/:id
PATCH /courses/assets/:id
```

### Expected Response Formats

#### User Response

```json
{
  "data": {
    "id": "user-123",
    "name": "John Doe",
    "role": "instructor",
    "permissions": ["upload", "delete"]
  }
}
```

#### Assets Response

```json
{
  "data": [
    {
      "id": "asset-123",
      "title": "Lecture Notes",
      "description": "Chapter 1 introduction",
      "type": "file",
      "date": "2025-08-09",
      "time": "10:00",
      "courseCode": "CS301",
      "courseId": "course-123",
      "updatedAt": "2025-08-09T10:00:00Z",
      "url": "/files/asset-123.pdf"
    }
  ]
}
```

## Deployment Considerations

### Environment Variables

```env
EXPRESS_API_BASE_URL=http://localhost:3001/api
```

### Cookie Configuration

- Secure: true (in production)
- HttpOnly: true
- SameSite: strict
- Domain configuration for cross-origin requests

### File Storage

- Implement proper file storage (local/cloud)
- Configure file serving endpoints
- Set up proper MIME type detection
- Implement file cleanup for deleted assets

## Performance Optimizations

1. **Lazy Loading**: Components load on demand
2. **Optimistic Updates**: UI updates before server confirmation
3. **Caching**: Implement asset caching strategies
4. **Pagination**: For large asset lists
5. **Compression**: Enable file compression for uploads

## Testing Strategy

### Unit Tests

- Hook functionality
- Component rendering
- Permission logic
- Validation functions

### Integration Tests

- API route testing
- Authentication flows
- File upload processes
- Error handling

### E2E Tests

- Complete user workflows
- Role-based access scenarios
- File upload and download
- Delete operations

This implementation provides a production-ready assets management system with proper security, error handling, and user experience considerations.
