# Developer Documentation

This document provides comprehensive information for developers working on the Coalight Frontend project.

## 🏗️ Architecture Overview

The Coalight Frontend is built using Next.js 15 with the App Router, following modern React patterns and best practices.

### Key Architectural Decisions

- **App Router**: Utilizing Next.js 15's App Router for better performance and developer experience
- **Server Components**: Leveraging React Server Components where appropriate
- **API Proxy Pattern**: All backend calls go through Next.js API routes for security
- **Type-First Development**: Comprehensive TypeScript usage throughout the codebase

### Folder Structure Deep Dive

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Route groups for auth pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── verify-email/
│   ├── (private)/               # Protected routes requiring authentication
│   │   ├── dashboard/
│   │   ├── courses/
│   │   ├── calendar/
│   │   └── ...
│   ├── (demo)/                  # Demo/test pages
│   ├── (others)/               # Miscellaneous public pages
│   ├── api/                    # API routes (proxy to backend)
│   │   ├── (auth)/            # Authentication endpoints
│   │   └── (data)/            # Data endpoints
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── not-found.tsx          # 404 page
├── components/                  # Reusable React components
│   ├── ui/                    # Base UI components (buttons, inputs, etc.)
│   ├── auth/                  # Authentication-specific components
│   ├── dashboard/             # Dashboard components
│   ├── courses/               # Course-related components
│   ├── calendar/              # Calendar components
│   ├── events/                # Event components
│   ├── assets/                # Asset management components
│   ├── form/                  # Form components
│   ├── layout/                # Layout components
│   └── basic/                 # Basic utility components
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions and configurations
│   ├── auth/                  # Authentication utilities
│   └── courses/               # Course-related utilities
├── redux/                      # Redux store configuration
│   ├── features/              # Redux slices
│   └── ...
├── types/                      # TypeScript type definitions
└── styles/                     # Global styles
```

## 🛠️ Development Environment Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 20.x or higher
- **npm**: Version 10.x or higher
- **Git**: For version control
- **VS Code**: Recommended IDE with the following extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Hero
  - Prettier - Code formatter
  - ESLint

### Environment Configuration

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd coalight-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**

   Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:

   ```bash
   # Backend API URL
   EXPRESS_API_BASE_URL=http://localhost:5000

   # Optional: Additional environment variables
   # NEXT_PUBLIC_SITE_URL=http://localhost:3000
   # NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🎨 UI/UX Development Guidelines

### Design System

The project uses a comprehensive design system based on:

- **Tailwind CSS v4**: For utility-first styling
- **Radix UI**: For accessible, unstyled components
- **Custom UI Components**: Located in `src/components/ui/`

### Component Development

#### Component Structure

```typescript
// components/example/ExampleComponent.tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ExampleComponentProps {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "destructive";
}

export function ExampleComponent({
  className,
  children,
  variant = "default",
}: ExampleComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      <Button variant={variant}>{children}</Button>
    </div>
  );
}
```

#### Best Practices

1. **TypeScript First**: Always define proper interfaces for props
2. **Accessibility**: Use semantic HTML and ARIA attributes
3. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
4. **Performance**: Use React.memo() for expensive components
5. **Testing**: Write unit tests for complex components

### Styling Guidelines

1. **Utility Classes**: Prefer Tailwind utilities over custom CSS
2. **Component Variants**: Use `class-variance-authority` for component variants
3. **Responsive Design**: Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
4. **Dark Mode**: Support both light and dark themes using `next-themes`

```typescript
// Example with variants
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

## 🔧 State Management

### Redux Toolkit

The application uses Redux Toolkit for global state management:

```typescript
// redux/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});
```


## 🌐 API Integration

### API Route Structure

All API calls are proxied through Next.js API routes for security and cookie management:

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const expressUrl = `${process.env.EXPRESS_API_BASE_URL}/example`;

  try {
    const response = await fetch(expressUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("Cookie") || "",
      },
      credentials: "include",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "set-cookie": response.headers.get("set-cookie") || "",
      },
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
```

### Error Handling

Implement consistent error handling across API routes:

```typescript
// lib/api-error-handler.ts
export class APIError extends Error {
  constructor(
    public message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

export function handleAPIError(error: unknown) {
  if (error instanceof APIError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.status }
    );
  }

  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
```

## 🔒 Authentication & Authorization

### Authentication Flow

1. **Login**: User submits credentials
2. **Backend Verification**: Credentials verified by Express API
3. **Token Management**: JWT tokens stored in HTTP-only cookies
4. **Client State**: User data stored in Redux
5. **Route Protection**: Middleware checks authentication status

### Middleware Setup

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");
  const isProtectedPage = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## 🧪 Testing

### Testing Strategy

1. **Unit Tests**: Jest + React Testing Library
2. **Integration Tests**: API route testing
3. **E2E Tests**: Playwright (recommended)
4. **Visual Tests**: Storybook (optional)

### Example Unit Test

```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
  });
});
```

## 🚀 Performance Optimization

### Next.js Optimizations

1. **Image Optimization**: Use `next/image` for all images
2. **Font Optimization**: Use `next/font` for web fonts
3. **Bundle Analysis**: Use `@next/bundle-analyzer`
4. **Dynamic Imports**: Code splitting with `next/dynamic`

### React Optimizations

1. **Memoization**: Use `React.memo`, `useMemo`, `useCallback`
2. **Lazy Loading**: Dynamic imports for large components
3. **Virtualization**: For long lists (react-window)

```typescript
// Example optimization
import { memo, useMemo } from "react";
import dynamic from "next/dynamic";

// Dynamic import
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

// Memoized component
export const OptimizedComponent = memo(({ data }: { data: any[] }) => {
  const processedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      processed: true,
    }));
  }, [data]);

  return (
    <div>
      {processedData.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});
```

## 📦 Build & Deployment

### Build Process

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### Environment-Specific Configurations

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  images: {
    domains: ["localhost", "your-api-domain.com"],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Build passes without errors
- [ ] All tests pass
- [ ] Performance metrics acceptable
- [ ] SEO meta tags configured
- [ ] Error tracking configured

## 🔍 Debugging

### Development Tools

1. **React Developer Tools**: Browser extension
2. **Redux DevTools**: For state debugging
3. **Next.js DevTools**: Built-in development features
4. **VS Code Debugger**: For server-side debugging

### Common Issues & Solutions

1. **Hydration Errors**: Use `useEffect` for client-only code
2. **Cookie Issues**: Ensure proper domain and path settings
3. **Build Errors**: Check TypeScript errors and imports
4. **Performance Issues**: Use React Profiler to identify bottlenecks

## 📋 Code Standards

### ESLint Configuration

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error",
    "no-console": "warn"
  }
}
```

### Git Workflow

1. **Feature Branches**: Create branches from `main`
2. **Commit Messages**: Use conventional commits
3. **Pull Requests**: Require code review
4. **Automated Checks**: ESLint, TypeScript, tests

### Code Review Guidelines

- [ ] TypeScript types are properly defined
- [ ] Components are properly tested
- [ ] Performance considerations addressed
- [ ] Accessibility requirements met
- [ ] Documentation updated if needed

## 🆘 Troubleshooting

### Common Commands

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Type checking
npm run type-check

# Build analysis
npm run analyze
```

### Getting Help

1. **Documentation**: Check this file and README.md
2. **Issues**: Create GitHub issues for bugs
3. **Discussions**: Use GitHub Discussions for questions
4. **Team**: Contact the development team

---

**Happy coding! 🚀**
