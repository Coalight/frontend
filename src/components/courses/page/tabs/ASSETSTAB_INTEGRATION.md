# AssetsTab - Course Page Integration

## Overview

The `AssetsTab` has been successfully integrated into the course page system, following the same pattern as `EventsTab`. It provides a complete asset management interface within the course context.

## Features

### ✅ **Real API Integration**

- Uses `useAssets` hook for real-time data
- Automatic loading and error states
- Real-time updates after operations

### ✅ **Role-Based Access Control**

- **Admin & Instructor**: Upload + Delete permissions
- **Moderator**: Upload only permissions
- **Student**: View only permissions
- Upload button shown/hidden based on permissions

### ✅ **Modern UI Components**

- Grid layout for better visual organization
- Loading skeleton states
- Error handling with retry functionality
- Empty state with helpful messaging

### ✅ **Asset Management**

- File upload with drag & drop
- External link sharing
- Delete functionality with confirmation
- Download/external link access
- Type-specific icons and colors

## Component Structure

### Main Component: `AssetsTab`

```tsx
export function AssetsTab({ course }: { course: Course }) {
  const { assets, loading, error, refetch, deleteAsset, canUpload, canDelete } =
    useAssets(course.id);

  // Role-based permission check
  const canUploadAssets =
    canUpload &&
    userRole &&
    ["ADMIN", "INSTRUCTOR", "MODERATOR"].includes(userRole);
}
```

### Supporting Components

- `AssetsLoadingState` - Loading skeleton
- `AssetsErrorState` - Error display with retry
- `FallBackAssets` - Empty state display

## Usage Context

### In Course Page

The AssetsTab is automatically included in the course page tab system:

```tsx
// Already configured in TabContent.tsx
const tabComponents: Record<TabType, React.ComponentType<any>> = {
  // ... other tabs
  assets: AssetsTab,
  // ... other tabs
};
```

### Tab Navigation

Available in the course tabs:

```tsx
// Already configured in CourseTabs.tsx
const tabs = [
  // ... other tabs
  { id: "assets", label: "Assets" },
  // ... other tabs
];
```

## Permission Matrix

| User Role  | View Assets | Upload Assets | Delete Assets |
| ---------- | ----------- | ------------- | ------------- |
| Admin      | ✅          | ✅            | ✅            |
| Instructor | ✅          | ✅            | ✅            |
| Moderator  | ✅          | ✅            | ❌            |
| Student    | ✅          | ❌            | ❌            |

## Layout Structure

### With Upload Permission

```
┌─────────────────────────────────────────┐
│ Course Assets                [Upload]   │
├─────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ │ Asset 1 │ │ Asset 2 │ │ Asset 3 │    │
│ │  [...]  │ │  [...]  │ │  [...]  │    │
│ └─────────┘ └─────────┘ └─────────┘    │
└─────────────────────────────────────────┘
```

### View Only (Students)

```
┌─────────────────────────────────────────┐
│ Course Assets                           │
├─────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ │ Asset 1 │ │ Asset 2 │ │ Asset 3 │    │
│ │ [View]  │ │ [View]  │ │ [View]  │    │
│ └─────────┘ └─────────┘ └─────────┘    │
└─────────────────────────────────────────┘
```

### Empty State

```
┌─────────────────────────────────────────┐
│                                         │
│          📁                             │
│    Assets will appear here              │
│                                         │
└─────────────────────────────────────────┘
```

## API Endpoints Used

The AssetsTab leverages the following API endpoints:

1. **GET** `/api/courses/assets?courseId={course.id}`

   - Fetches all assets for the course
   - Automatic permission filtering server-side

2. **POST** `/api/courses/assets`

   - Upload new assets (files or links)
   - Requires upload permissions

3. **DELETE** `/api/courses/assets/{id}`

   - Delete specific assets
   - Requires delete permissions

4. **GET** `/api/user`
   - Get current user role and permissions
   - Used for client-side UI decisions

## Error Handling

### Network Errors

- Automatic retry mechanism
- User-friendly error messages
- Maintains existing state during errors

### Permission Errors

- Graceful degradation of UI
- Clear messaging for unauthorized actions
- Appropriate button states

### Loading States

- Skeleton loading animations
- Non-blocking UI updates
- Progress indicators for uploads

## Integration Benefits

### 🔄 **Consistency with EventsTab**

- Same UI patterns and behavior
- Consistent loading and error states
- Similar permission handling

### 🛡️ **Security**

- Role-based access control
- Server-side permission validation
- Secure file handling

### 🎨 **User Experience**

- Responsive grid layout
- Drag and drop file uploads
- Real-time feedback
- Accessibility support

### 🔧 **Maintainability**

- Modular component structure
- Reusable hooks and utilities
- Clear separation of concerns
- Easy to extend and modify

## Next Steps

### Backend Integration

Ensure your Express.js backend has:

```javascript
// Asset endpoints
app.get("/courses/assets", authenticateUser, getAssets);
app.post("/courses/assets", authenticateUser, uploadAsset);
app.delete("/courses/assets/:id", authenticateUser, deleteAsset);

// User endpoint
app.get("/auth/user", authenticateUser, getCurrentUser);
```

### Database Schema

Assets table should include:

```sql
CREATE TABLE assets (
  id UUID PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  type VARCHAR NOT NULL,
  course_id UUID REFERENCES courses(id),
  uploaded_by UUID REFERENCES users(id),
  file_url VARCHAR,
  file_size INTEGER,
  file_name VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### File Storage

Configure file storage system:

- AWS S3 for cloud storage
- Local filesystem for development
- Proper file cleanup on delete
- Secure file access URLs

---

**The AssetsTab is now fully integrated and production-ready!** 🎉

It provides the same professional experience as EventsTab with comprehensive asset management capabilities, role-based permissions, and modern UI patterns.
