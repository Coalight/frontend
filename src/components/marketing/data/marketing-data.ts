import {
  LucideIcon,
  BookOpenCheck,
  Bot,
  CalendarDays,
  FileText,
  FolderKanban,
  MessageSquare,
  Sparkles,
  TrendingUp,
  UploadCloud,
  Users,
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
}
export interface Stat {
  value: string;
  label: string;
  description: string;
}

export const features: Feature[] = [
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
    name: "Sarah J.",
    role: "Math Teacher",
    content:
      "Cut my lesson prep time in half while improving student outcomes. The perfect classroom assistant.",
  },
  {
    name: "Mike C.",
    role: "Physics Teacher",
    content:
      "Students actually look forward to my classes now. Engagement levels have never been higher.",
  },
  {
    name: "Emily R.",
    role: "School Principal",
    content:
      "Our entire staff adopted it within weeks. The most seamless transition we've ever experienced.",
  },
  {
    name: "James W.",
    role: "University Professor",
    content:
      "Transformed how I deliver course material. Students retain information much more effectively.",
  },
  {
    name: "Lisa T.",
    role: "Special Ed Teacher",
    content:
      "Finally, a platform that truly understands diverse learning needs and accessibility requirements.",
  },
  {
    name: "David P.",
    role: "STEM Director",
    content:
      "We saw measurable improvements across all grade levels within just one semester of use.",
  },
  {
    name: "Amina D.",
    role: "Education Dean",
    content:
      "Now our standard recommendation for all incoming faculty. The gold standard in edtech.",
  },
  {
    name: "Robert O.",
    role: "IB Coordinator",
    content:
      "Works flawlessly across our international campuses. The multilingual support is exceptional.",
  },
  {
    name: "Jen L.",
    role: "Literacy Coach",
    content:
      "The most thoughtfully designed educational tool I've encountered in my 15-year career.",
  },
  {
    name: "Miguel H.",
    role: "Tech Admin",
    content:
      "Implementation was effortless, and the support team responded to all queries within hours.",
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
