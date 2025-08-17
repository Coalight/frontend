# API Documentation

This document provides comprehensive information about all API endpoints available in the Coalight Frontend application. All endpoints are proxied through Next.js API routes to the backend Express server.

## 📋 Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Base URL & Headers](#base-url--headers)
- [Error Handling](#error-handling)
- [Authentication Endpoints](#authentication-endpoints)
- [Course Management](#course-management)
- [Asset Management](#asset-management)
- [Event Management](#event-management)
- [User Management](#user-management)

## 🌐 Overview

The Coalight Frontend acts as a proxy to the backend Express API. All API calls go through Next.js API routes for better security, cookie management, and error handling.

### Architecture

```
Frontend (Next.js) → API Routes → Backend (Express) → Database
```

## 🔒 Authentication

The application uses JWT tokens stored in HTTP-only cookies for authentication. All protected endpoints require valid authentication tokens.

### Authentication Flow

1. User logs in with credentials
2. Backend validates and returns JWT tokens
3. Tokens are stored in HTTP-only cookies
4. Subsequent requests include cookies automatically
5. Middleware validates tokens on protected routes

## 🌍 Base URL & Headers

### Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

### Required Headers

```http
Content-Type: application/json
Cookie: accessToken=<jwt_token>; refreshToken=<refresh_token>
```

## ❌ Error Handling

### Standard Error Response Format

```typescript
interface ErrorResponse {
  error: string;
  message?: string;
  code?: string;
  details?: any;
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### Example Error Response

```json
{
  "error": "Invalid credentials",
  "message": "Email or password is incorrect",
  "code": "AUTH_INVALID_CREDENTIALS"
}
```

---

## 🔐 Authentication Endpoints

### POST /api/auth/signup

Register a new user account.

**Request Body:**

```typescript
interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
```

**Example Request:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

**Success Response (201):**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_123",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "STUDENT"
  },
  "isEmailVerified": false
}
```

**Error Responses:**

```json
// 400 - Validation Error
{
  "error": "Passwords do not match"
}

// 400 - Invalid Email
{
  "error": "Invalid email format"
}

// 409 - User Exists
{
  "error": "User already exists with this email"
}
```

---

### POST /api/auth/login

Authenticate user with email and password.

**Request Body:**

```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

**Example Request:**

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**

```json
{
  "message": "Login successful",
  "user": {
    "id": "user_123",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "STUDENT"
  },
  "isEmailVerified": true
}
```

**Error Responses:**

```json
// 400 - Missing Fields
{
  "error": "Email and password are required"
}

// 401 - Invalid Credentials
{
  "error": "Invalid email or password"
}

// 403 - Email Not Verified
{
  "error": "Please verify your email before logging in"
}
```

---

### POST /api/auth/logout

Logout user and clear authentication tokens.

**Request:** No body required

**Success Response (200):**

```json
{
  "message": "Logout successful"
}
```

---

### POST /api/auth/refresh

Refresh authentication tokens using refresh token.

**Request:** No body required (uses refresh token from cookies)

**Success Response (200):**

```json
{
  "message": "Token refreshed successfully",
  "user": {
    "id": "user_123",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "STUDENT"
  }
}
```

**Error Response (401):**

```json
{
  "error": "Invalid or expired refresh token"
}
```

---

### GET /api/auth/user

Get current authenticated user information.

**Request:** No body required

**Success Response (200):**

```json
{
  "user": {
    "id": "user_123",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "STUDENT",
    "isEmailVerified": true,
    "createdAt": "2024-01-15T08:30:00Z"
  }
}
```

**Error Response (401):**

```json
{
  "error": "Unauthorized"
}
```

---

### POST /api/auth/verify-email/sent-code

Send email verification code to user's email.

**Request Body:**

```typescript
interface SendCodeRequest {
  email: string;
}
```

**Example Request:**

```json
{
  "email": "john.doe@example.com"
}
```

**Success Response (200):**

```json
{
  "message": "Verification code sent successfully"
}
```

---

### POST /api/auth/verify-email/verify-code

Verify email using verification code.

**Request Body:**

```typescript
interface VerifyCodeRequest {
  email: string;
  code: string;
}
```

**Example Request:**

```json
{
  "email": "john.doe@example.com",
  "code": "123456"
}
```

**Success Response (200):**

```json
{
  "message": "Email verified successfully",
  "user": {
    "id": "user_123",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "STUDENT",
    "isEmailVerified": true
  }
}
```

**Error Responses:**

```json
// 400 - Invalid Code
{
  "error": "Invalid verification code"
}

// 410 - Expired Code
{
  "error": "Verification code has expired"
}
```

---

## 📚 Course Management

### GET /api/courses/all

Get all courses enrolled by the current user.

**Request:** No body required

**Success Response (200):**

```json
{
  "courses": [
    {
      "id": "course_123",
      "title": "Introduction to Computer Science",
      "code": "CS101",
      "joining_code": "ABC123",
      "description": "Basic computer science concepts",
      "credits": "3",
      "start_date": "2024-01-15T00:00:00Z",
      "class_days": ["mon", "wed", "fri"],
      "total_students": 25,
      "created_at": "2024-01-01T00:00:00Z",
      "instructor": {
        "id": "instructor_456",
        "name": "Dr. Jane Smith",
        "email": "jane.smith@university.edu"
      },
      "currentUserRole": "STUDENT"
    }
  ]
}
```

**Course Object Interface:**

```typescript
interface Course {
  id: string;
  title: string;
  code: string;
  joining_code: string;
  created_by: string;
  created_at: string;
  description: string;
  credits: string;
  start_date: string;
  class_days: DayOfWeek[];
  total_students: number;
  instructor?: {
    id: string;
    name: string;
    email: string;
  };
  currentUserRole?: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "MODERATOR";
  Peoples?: EnrolledPeople[];
  Events?: CourseEvent[];
}

type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
```

---

### POST /api/courses/new

Create a new course (Instructors/Admins only).

**Request Body:**

```typescript
interface CreateCourseRequest {
  title: string;
  code: string;
  description: string;
  credits: string;
  start_date: string; // ISO date string
  class_days: DayOfWeek[];
}
```

**Example Request:**

```json
{
  "title": "Advanced Data Structures",
  "code": "CS201",
  "description": "Advanced concepts in data structures and algorithms",
  "credits": "4",
  "start_date": "2024-02-01T00:00:00Z",
  "class_days": ["tue", "thu"]
}
```

**Success Response (201):**

```json
{
  "message": "Course created successfully",
  "course": {
    "id": "course_456",
    "title": "Advanced Data Structures",
    "code": "CS201",
    "joining_code": "XYZ789",
    "description": "Advanced concepts in data structures and algorithms",
    "credits": "4",
    "start_date": "2024-02-01T00:00:00Z",
    "class_days": ["tue", "thu"],
    "total_students": 0,
    "created_at": "2024-01-20T08:30:00Z",
    "created_by": "instructor_456"
  }
}
```

**Error Responses:**

```json
// 400 - Missing Fields
{
  "error": "All required fields must be provided"
}

// 403 - Insufficient Permissions
{
  "error": "Only instructors and admins can create courses"
}

// 409 - Course Code Exists
{
  "error": "Course with this code already exists"
}
```

---

### POST /api/courses/join/[courseID]

Join a course using course ID or joining code.

**URL Parameters:**

- `courseID`: Course ID or joining code

**Request Body:**

```typescript
interface JoinCourseRequest {
  joiningCode?: string; // Alternative to URL parameter
}
```

**Example Request:**

```json
{
  "joiningCode": "ABC123"
}
```

**Success Response (200):**

```json
{
  "message": "Successfully joined the course",
  "enrollment": {
    "id": "enrollment_789",
    "user_id": "user_123",
    "course_id": "course_123",
    "role": "STUDENT",
    "enrolled_at": "2024-01-20T10:15:00Z"
  }
}
```

**Error Responses:**

```json
// 404 - Course Not Found
{
  "error": "Course not found"
}

// 409 - Already Enrolled
{
  "error": "You are already enrolled in this course"
}

// 403 - Course Full
{
  "error": "Course has reached maximum capacity"
}
```

---

### GET /api/courses/people

Get all people enrolled in user's courses.

**Success Response (200):**

```json
{
  "people": [
    {
      "id": "enrollment_123",
      "user_id": "user_456",
      "course_id": "course_123",
      "role": "STUDENT",
      "enrolled_at": "2024-01-15T08:30:00Z",
      "user_name": "Alice Johnson",
      "user_email": "alice.johnson@example.com"
    }
  ]
}
```

**EnrolledPeople Interface:**

```typescript
interface EnrolledPeople {
  id: string;
  user_id: string;
  course_id: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "MODERATOR";
  enrolled_at: string;
  user_name: string;
  user_email: string;
}
```

---

### GET /api/courses/events

Get all events for user's enrolled courses.

**Success Response (200):**

```json
{
  "events": [
    {
      "id": "event_123",
      "title": "Midterm Exam",
      "description": "Midterm examination for CS101",
      "event_date": "2024-03-15T14:00:00Z",
      "event_type": "EXAM",
      "course_id": "course_123",
      "created_by": "instructor_456",
      "created_at": "2024-01-20T08:30:00Z"
    }
  ]
}
```

**CourseEvent Interface:**

```typescript
interface CourseEvent {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_type: "ASSIGNMENT" | "EXAM" | "LECTURE" | "LAB" | "OTHER";
  course_id: string;
  created_by: string;
  created_at: string;
}
```

---

## 📁 Asset Management

### GET /api/assets/courses

Get all assets for user's enrolled courses.

**Success Response (200):**

```json
{
  "assets": [
    {
      "id": "asset_123",
      "title": "Lecture Notes - Chapter 1",
      "description": "Introduction to programming concepts",
      "file_url": "https://storage.example.com/files/lecture1.pdf",
      "file_type": "application/pdf",
      "file_size": 2048576,
      "course_id": "course_123",
      "uploaded_by": "instructor_456",
      "uploaded_at": "2024-01-20T08:30:00Z"
    }
  ]
}
```

**Asset Interface:**

```typescript
interface Asset {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number;
  course_id: string;
  uploaded_by: string;
  uploaded_at: string;
}
```

---

### GET /api/assets/[id]

Get specific asset by ID.

**URL Parameters:**

- `id`: Asset ID

**Success Response (200):**

```json
{
  "asset": {
    "id": "asset_123",
    "title": "Lecture Notes - Chapter 1",
    "description": "Introduction to programming concepts",
    "file_url": "https://storage.example.com/files/lecture1.pdf",
    "file_type": "application/pdf",
    "file_size": 2048576,
    "course_id": "course_123",
    "uploaded_by": "instructor_456",
    "uploaded_at": "2024-01-20T08:30:00Z",
    "download_count": 45
  }
}
```

**Error Response (404):**

```json
{
  "error": "Asset not found"
}
```

---

### DELETE /api/assets/[id]

Delete an asset (Instructors/Admins only).

**URL Parameters:**

- `id`: Asset ID

**Success Response (200):**

```json
{
  "message": "Asset deleted successfully"
}
```

**Error Responses:**

```json
// 404 - Asset Not Found
{
  "error": "Asset not found"
}

// 403 - Insufficient Permissions
{
  "error": "You don't have permission to delete this asset"
}
```

---

## 📅 Event Management

### GET /api/events

Get all events for the authenticated user.

**Query Parameters:**

- `course_id` (optional): Filter by specific course
- `event_type` (optional): Filter by event type
- `start_date` (optional): Filter events from date (ISO string)
- `end_date` (optional): Filter events until date (ISO string)

**Example Request:**

```
GET /api/events?course_id=course_123&event_type=EXAM&start_date=2024-01-01T00:00:00Z
```

**Success Response (200):**

```json
{
  "events": [
    {
      "id": "event_123",
      "title": "Final Exam",
      "description": "Comprehensive final examination",
      "event_date": "2024-05-15T14:00:00Z",
      "event_type": "EXAM",
      "course_id": "course_123",
      "created_by": "instructor_456",
      "created_at": "2024-01-20T08:30:00Z",
      "course": {
        "title": "Introduction to Computer Science",
        "code": "CS101"
      }
    }
  ]
}
```

---

### POST /api/events

Create a new event (Instructors/Admins only).

**Request Body:**

```typescript
interface CreateEventRequest {
  title: string;
  description: string;
  event_date: string; // ISO date string
  event_type: "ASSIGNMENT" | "EXAM" | "LECTURE" | "LAB" | "OTHER";
  course_id: string;
}
```

**Example Request:**

```json
{
  "title": "Assignment 1",
  "description": "First programming assignment",
  "event_date": "2024-02-15T23:59:00Z",
  "event_type": "ASSIGNMENT",
  "course_id": "course_123"
}
```

**Success Response (201):**

```json
{
  "message": "Event created successfully",
  "event": {
    "id": "event_456",
    "title": "Assignment 1",
    "description": "First programming assignment",
    "event_date": "2024-02-15T23:59:00Z",
    "event_type": "ASSIGNMENT",
    "course_id": "course_123",
    "created_by": "instructor_456",
    "created_at": "2024-01-20T08:30:00Z"
  }
}
```

---

## 👥 User Management

### GET /api/users/profile

Get current user's detailed profile.

**Success Response (200):**

```json
{
  "profile": {
    "id": "user_123",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "STUDENT",
    "isEmailVerified": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "lastLoginAt": "2024-01-20T08:30:00Z",
    "preferences": {
      "theme": "dark",
      "notifications": true,
      "language": "en"
    },
    "stats": {
      "coursesEnrolled": 3,
      "assignmentsCompleted": 12,
      "totalScore": 85.5
    }
  }
}
```

---

### PUT /api/users/profile

Update user profile information.

**Request Body:**

```typescript
interface UpdateProfileRequest {
  name?: string;
  preferences?: {
    theme?: "light" | "dark";
    notifications?: boolean;
    language?: string;
  };
}
```

**Example Request:**

```json
{
  "name": "John Smith",
  "preferences": {
    "theme": "dark",
    "notifications": false
  }
}
```

**Success Response (200):**

```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_123",
    "email": "john.doe@example.com",
    "name": "John Smith",
    "role": "STUDENT",
    "preferences": {
      "theme": "dark",
      "notifications": false,
      "language": "en"
    }
  }
}
```

---

## 🔧 Utility Endpoints

### GET /api/health

Health check endpoint.

**Success Response (200):**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-20T08:30:00Z",
  "version": "1.0.0"
}
```

---

### GET /api/version

Get application version information.

**Success Response (200):**

```json
{
  "version": "1.0.0",
  "buildDate": "2024-01-20T08:30:00Z",
  "environment": "production"
}
```

---

## 📝 Rate Limiting

All API endpoints are subject to rate limiting:

- **Authentication endpoints**: 5 requests per minute per IP
- **Data endpoints**: 100 requests per minute per user
- **Upload endpoints**: 10 requests per minute per user

Rate limit headers:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642665600
```

<!--
## 🔄 Pagination

For endpoints that return large datasets, pagination is supported:

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `sort`: Sort field
- `order`: Sort order (asc/desc)

**Example:**

```
GET /api/courses/all?page=2&limit=10&sort=created_at&order=desc
```

**Paginated Response:**

```json
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": true
  }
}
``` -->

## 🐛 Debugging

### Request/Response Logging

In development mode, all API requests and responses are logged. Use the browser's Developer Tools Network tab to inspect API calls.

### Common Issues

1. **CORS Errors**: Ensure proper origin configuration
2. **Cookie Issues**: Check SameSite and Secure flags
3. **Authentication Errors**: Verify token expiration
4. **Timeout Errors**: Check backend server status

### Support

For API-related issues:

- Check the Developer Tools Network tab
- Review server logs
- Contact the backend development team
- Create an issue in the project repository

---

**Last Updated: August 17, 2025**
