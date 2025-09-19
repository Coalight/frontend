"use client";

import { useTheme } from "next-themes";

export default function Background() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return isDark ? (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(244, 114, 182, 0.25), transparent 70%), #000000",
      }}
    />
  ) : (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(236, 72, 153, 0.35), transparent 70%), #ffffff",
      }}
    />
  );
}
