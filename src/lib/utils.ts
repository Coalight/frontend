import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { format, formatDistanceToNow, parse, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatShortDate = (dateString: string) => {
  return format(new Date(dateString), "EEE, MMM d, yy");
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

export function formatTimeSince_new(dateString: string): string {
  try {
    const isoString = dateString.replace(" ", "T");

    const pastDate = parseISO(isoString);

    const relativeTime = formatDistanceToNow(pastDate, { addSuffix: true });
    return relativeTime.replace("about ", "");
  } catch (error) {
    console.error(`Could not format date: "${dateString}"`, error);
    return dateString;
  }
}
export const formatToAMPM = (timeString: string | undefined): string => {
  if (!timeString) return "";
  try {
    const referenceDate = new Date();

    // Parse the time string using its format 'HH:mm:ss'.
    const date = parse(timeString, "HH:mm:ss", referenceDate);

    // Format the date to 'hh:mm a' to get AM/PM format.
    return format(date, "hh:mm a");
  } catch (error) {
    console.error("Could not format time:", timeString, error);
    return timeString;
  }
};
