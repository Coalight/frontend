import {
  BookOpen,
  Users,
  MessageSquare,
  Calendar,
  FileText,
  BarChart3,
  LucideIcon,
} from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  stats: string;
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

export const features: Feature[] = [
  {
    title: "Easy Course Creation",
    description:
      "Create and organize courses effortlessly. Add materials, assignments, and resources with our simple drag-and-drop interface.",
    icon: BookOpen,
    stats: "5 min setup",
  },
  {
    title: "Student Management",
    description:
      "Manage student enrollments, track progress, and communicate with your class all in one place. Simple and effective.",
    icon: Users,
    stats: "Unlimited students",
  },
  {
    title: "Class Discussions",
    description:
      "Foster engagement with built-in discussion forums, announcements, and real-time messaging for better collaboration.",
    icon: MessageSquare,
    stats: "Real-time chat",
  },
  {
    title: "Assignment Scheduling",
    description:
      "Schedule assignments, set due dates, and track submissions. Keep your class organized with our calendar system.",
    icon: Calendar,
    stats: "Smart reminders",
  },
  {
    title: "Resource Sharing",
    description:
      "Share documents, videos, links, and other learning materials. Support for all file types with cloud storage.",
    icon: FileText,
    stats: "5GB free storage",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor student progress with simple analytics. See who's participating and who might need extra help.",
    icon: BarChart3,
    stats: "Clear insights",
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
    value: "50K+",
    label: "Active Users",
    description: "Teachers & Students",
  },
  {
    value: "1,200+",
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
