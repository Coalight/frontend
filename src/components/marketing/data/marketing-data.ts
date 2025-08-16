import {
  Users,
  MessageSquare,
  FileText,
  LucideIcon,
  BookOpenCheck,
  Bot,
  CalendarDays,
  FolderKanban,
  Sparkles,
  TrendingUp,
  UploadCloud,
} from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
  company: string;
}

export interface Stat {
  value: string;
  label: string;
  description: string;
}

export const allFeatures: Feature[] = [
  {
    icon: UploadCloud,
    title: "Upload Content",
    description:
      "Begin by easily uploading your course materials, lecture notes, or any educational content in various formats.",
  },
  {
    icon: Bot,
    title: "AI-Powered Processing",
    description:
      "Our intelligent AI analyzes your content, identifying key concepts to structure it for optimal learning.",
  },
  {
    icon: FileText,
    title: "Generate Resources",
    description:
      "Instantly create quizzes, summaries, and lesson plans from your uploaded content with a single click.",
  },
  {
    icon: BookOpenCheck,
    title: "Easy Course Creation",
    description:
      "Organize materials, assignments, and resources into comprehensive courses using a simple drag-and-drop interface.",
  },
  {
    icon: Users,
    title: "Student Management",
    description:
      "Manage enrollments, track individual progress, and communicate with your entire class all in one place.",
  },
  {
    icon: MessageSquare,
    title: "Class Discussions",
    description:
      "Foster engagement with built-in discussion forums, announcements, and real-time messaging for collaboration.",
  },
  {
    icon: CalendarDays,
    title: "Assignment Scheduling",
    description:
      "Schedule assignments, set due dates, and track submissions to keep your class organized and on track.",
  },
  {
    icon: FolderKanban,
    title: "Resource Sharing",
    description:
      "Share documents, videos, and links. Our cloud storage supports all major file types for easy access.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Monitor student and class progress with simple analytics to see who is participating and who may need extra help.",
  },
  {
    icon: Sparkles,
    title: "Enhance & Export",
    description:
      "Review all generated materials, make final adjustments, and export them in your desired format for distribution.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "High School Teacher",
    company: "Lincoln High School",
    content:
      "Coalight made remote teaching so much easier. My students are more engaged and organized than ever before. It's completely free and works perfectly!",
    avatar: "/defaults/avatar.jpg",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "College Student",
    company: "State University",
    content:
      "Finally, a platform that doesn't cost anything and actually works well. I can keep track of all my classes and assignments in one place.",
    avatar: "/defaults/avatar.jpg",
    rating: 5,
  },
  {
    name: "Dr. Emma Davis",
    role: "University Professor",
    company: "Community College",
    content:
      "I've tried many platforms, but Coalight is the most intuitive and user-friendly. My students adapted to it immediately, and it's 100% free.",
    avatar: "/defaults/avatar.jpg",
    rating: 5,
  },
];

export const stats: Stat[] = [
  {
    value: "50K",
    label: "Active Users",
    description: "Teachers & Students",
  },
  {
    value: "1100",
    label: "Schools",
    description: "Using Coalight",
  },
  { value: "100%", label: "Free Forever", description: "No hidden costs" },
  { value: "24/7", label: "Available", description: "Always accessible" },
];

export const demoFeatures = [
  "Create your first course",
  "Add students to your class",
  "Share learning materials",
  "Create and grade assignments",
  "Track student progress",
];

export const footerLinks = {
  product: ["Features", "How it works", "Templates", "Help Center", "Updates"],
  resources: ["Getting Started", "Tutorials", "Community", "Blog", "Support"],
  company: ["About", "Privacy", "Terms", "Contact", "Feedback"],
};

export const socialLinks = [
  { name: "twitter", href: "#" },
  { name: "github", href: "#" },
  { name: "youtube", href: "#" },
  { name: "discord", href: "#" },
];
