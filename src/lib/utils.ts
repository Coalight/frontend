import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatShortDate = (dateString: string) => {
  return format(new Date(dateString), "EEE, MMM d");
};

export const formatLongDate = (dateString: string) => {
  return format(new Date(dateString), "EEEE, MMMM d, yyyy");
};

export const formatTimeSince = (dateString: string) => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

export const getGreeting = (name: string) => {
  const hour = new Date().getHours();
  if (hour < 12) return `Good morning, ${name}`;
  if (hour < 18) return `Good afternoon, ${name}`;
  return `Good evening, ${name}`;
};
