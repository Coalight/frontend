"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface UpcomingSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  viewAllLink?: React.ReactNode;
}

export const UpcomingSection = ({
  title,
  icon,
  children,
  viewAllLink,
}: UpcomingSectionProps) => (
  <div className="rounded-lg border p-4">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {viewAllLink ? (
        viewAllLink
      ) : (
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          See All <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);
