import { cn } from "@/lib/utils";
import { Testimonial } from "../data/marketing-data";
import { Quote } from "lucide-react";

const colors = [
  "bg-fuchsia-500", // Vibrant pink-purple
  "bg-cyan-400", // Bright cyan
  "bg-emerald-400", // Fresh green
  "bg-violet-500", // Deep purple
  "bg-rose-500", // Bold pink
  "bg-sky-500", // Bright sky blue
  "bg-lime-400", // Electric lime green
  "bg-amber-400", // Warm amber
  "bg-pink-500", // Hot pink
  "bg-blue-400", // Electric blue
  "bg-purple-400", // Royal purple
  "bg-red-400", // Bright red
];

export const ReviewCard = ({ name, role, content }: Testimonial) => {
  const colorIndex = name.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div
      className={cn(
        "relative h-full w-100 cursor-pointer overflow-hidden rounded-xl p-6 pt-4 pb-4 mx-4",
        // light styles
        "bg-white/5 hover:bg-white shadow-lg border border-gray-200 hover:border-opacity-50",
        // dark styles
        "dark:bg-black/5 dark:hover:bg-gray-950 dark:border-gray-700",
        // transition
        "transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
      )}
    >
      {/* Large decorative quote icon */}
      <Quote
        className="absolute top-4 right-4 w-16 h-16 opacity-5 dark:opacity-[0.03]"
        strokeWidth={1}
      />
      <Quote
        className="absolute bottom-4 left-4 w-16 h-16 opacity-5 dark:opacity-[0.03]"
        strokeWidth={1}
      />

      <div className="flex flex-col gap-5 relative z-10">
        {/* Avatar with offset ring effect */}
        <ProfileAvatar bgColor={bgColor} name={name} role={role} />
        {/* Content with quote marks */}
        <blockquote className="relative pl-6">
          <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">
            {content}
          </p>
        </blockquote>
      </div>
    </div>
  );
};

function ProfileAvatar({
  bgColor,
  name,
  role,
}: {
  bgColor: string;
  name: string;
  role: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex items-center justify-center">
        {/* Outer ring (same color but lighter) */}
        <div
          className={`absolute w-13 h-13 rounded-full ${bgColor} opacity-20`}
        ></div>

        {/* Middle ring (spacer) */}
        {/* <div className="absolute w-14 h-14 rounded-full bg-white dark:bg-gray-900"></div> */}

        {/* Inner avatar circle */}
        <div
          className={`relative w-12 h-12 rounded-full ${bgColor} flex items-center justify-center text-white text-xl font-bold shadow-md border-2 border-white dark:border-gray-800`}
        >
          {name.charAt(0)}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold dark:text-white">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  );
}
