# Coalight Frontend

A modern education platform frontend built with Next.js, featuring course management, user authentication, and interactive learning experiences.

## 🚀 Features

- **Modern UI/UX**: Built with Next.js 15, React 19, and Tailwind CSS
- **Course Management**: Create, join, and manage courses
- **Real-time Dashboard**: Interactive dashboard for students and instructors
- **Asset Management**: Upload and manage course assets
- **Event System**: Course events and calendar integration
- **Responsive Design**: Mobile-first design with dark/light theme support
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **State Management**: Redux Toolkit + React Query
- **Icons**: Lucide React, Tabler Icons, React Icons
- **Animation**: Framer Motion

## 📋 Prerequisites

- Node.js >= 20.x
- npm >= 10.x
- A running backend API server

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd coalight-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

   Update the environment variables in `.env.local`:

   ```bash
   EXPRESS_API_BASE_URL=http://localhost:5000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (private)/         # Protected routes
│   ├── api/               # API routes (proxy to backend)
│   └── ...
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   └── ...
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── redux/                # Redux store and slices
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 API Integration

This frontend acts as a proxy to a backend Express API. All API calls are routed through Next.js API routes for better security and cookie management.

### API Route Structure

- `/api/auth/*` - Authentication endpoints
- `/api/courses/*` - Course management
- `/api/assets/*` - Asset management

## 🎨 UI Components

The project uses a comprehensive design system built on:

- **Radix UI** for accessibility
- **Tailwind CSS** for styling
- **Custom components** in `src/components/ui/`

## 🔒 Authentication

- Email/password authentication
- Email verification system
- JWT token management
- Role-based access control (Student, Instructor, Admin)

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimizations
- Dark/light theme support
- Progressive Web App features

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically

### Other Platforms

1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

## 🆘 Support

For support, email sahedul.dev@gmail.com.

---

## Other Documentations

- 📚 [**API Documentation**](./API.md)

- 👨‍💻 [**Developer Documentation**](./DEVELOPER.md)

---

**Built with ❤️ by [Sahedul Islam Rony](https://linkedin.com/in/sahedulislamrony)**
