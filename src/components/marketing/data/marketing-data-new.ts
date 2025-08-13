import {
  Zap,
  Layers,
  MessageCircle,
  Shield,
  BarChart3,
  Target,
  LucideIcon,
} from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  stats: string;
  bgColor: string;
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
    title: "Lightning Course Setup",
    description:
      "Create and launch courses in minutes with our AI-powered setup wizard and smart templates",
    icon: Zap,
    gradient: "from-cyan-400 via-blue-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
    stats: "10x faster",
  },
  {
    title: "Intelligent Organization",
    description:
      "Automated content categorization and smart tagging system that learns from your preferences",
    icon: Layers,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    stats: "Zero manual work",
  },
  {
    title: "Real-time Collaboration",
    description:
      "Seamless communication tools with instant messaging, video calls, and collaborative workspaces",
    icon: MessageCircle,
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    stats: "24/7 connectivity",
  },
  {
    title: "Advanced Security",
    description:
      "Enterprise-grade security with end-to-end encryption and comprehensive access controls",
    icon: Shield,
    gradient: "from-orange-400 via-red-500 to-pink-600",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    stats: "Bank-level security",
  },
  {
    title: "Smart Analytics",
    description:
      "AI-powered insights and predictive analytics to optimize learning outcomes and engagement",
    icon: BarChart3,
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    stats: "Predictive insights",
  },
  {
    title: "Precision Matching",
    description:
      "Advanced ML algorithms match students with compatible study partners and mentors",
    icon: Target,
    gradient: "from-teal-400 via-cyan-500 to-blue-600",
    bgColor: "bg-gradient-to-br from-teal-50 to-cyan-50",
    stats: "98% compatibility",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Dr. Emily Chen",
    role: "Dean of Computer Science",
    company: "Stanford University",
    content:
      "Coalight revolutionized our entire curriculum delivery. Student engagement is at an all-time high, and administrative overhead has virtually disappeared.",
    avatar: "/defaults/avatar.jpg",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Graduate Student",
    company: "MIT",
    content:
      "The AI-powered study matching changed my academic life. I found incredible study partners and my grades improved by 40% in one semester.",
    avatar: "/defaults/avatar.jpg",
    rating: 5,
  },
  {
    name: "Prof. Sarah Williams",
    role: "Director of Innovation",
    company: "Harvard Business School",
    content:
      "We've implemented Coalight across 15 departments. The analytics insights have helped us redesign our entire educational approach.",
    avatar: "/defaults/avatar.jpg",
    rating: 5,
  },
];

export const stats: Stat[] = [
  {
    value: "150K+",
    label: "Active Learners",
    description: "Students worldwide",
  },
  {
    value: "2,500+",
    label: "Institutions",
    description: "Universities & schools",
  },
  { value: "99.7%", label: "Uptime", description: "System reliability" },
  { value: "45%", label: "Better Outcomes", description: "Improved grades" },
];

export const demoFeatures = [
  "AI Course Builder",
  "Smart Assignment Engine",
  "Real-time Feedback System",
  "Intelligent Study Matching",
  "Advanced Analytics Dashboard",
];

export const footerLinks = {
  product: ["Features", "Pricing", "API", "Integrations", "Enterprise"],
  resources: ["Documentation", "Tutorials", "Community", "Blog", "Support"],
  company: ["About", "Careers", "Press", "Partners", "Contact"],
};

export const socialLinks = [
  { name: "twitter", href: "#" },
  { name: "github", href: "#" },
  { name: "linkedin", href: "#" },
  { name: "discord", href: "#" },
];
