// components/Notification.tsx
"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy notifications data
const notifications = [
  {
    id: "1",
    title: "New assignment posted",
    message: "Week 5 project is now available",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "Grade updated",
    message: "Your submission has been graded",
    time: "1 day ago",
    read: true,
  },
  {
    id: "3",
    title: "Course reminder",
    message: "Live session starts in 30 minutes",
    time: "3 days ago",
    read: true,
  },
];

export default function Notification() {
  const [unreadCount] = useState(notifications.filter((n) => !n.read).length);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-accent/50 transition-colors"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 rounded-lg border bg-background shadow-lg z-[999] animate-in fade-in-80 slide-in-from-top-2"
      >
        <div className="p-4 border-b">
          <h3 className="font-medium text-sm flex items-center justify-between">
            Notifications
            {unreadCount > 0 && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h3>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "p-4 text-sm transition-colors",
                  "focus:bg-accent/50 focus:outline-none",
                  !notification.read ? "bg-accent/30" : "hover:bg-accent/20"
                )}
              >
                <div className="flex gap-3">
                  <div
                    className={cn(
                      "flex items-start justify-center h-5 w-5 mt-0.5 rounded-full",
                      !notification.read
                        ? "bg-blue-500/10 text-blue-500"
                        : "text-muted-foreground"
                    )}
                  >
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-muted-foreground">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                      )}
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          )}
        </div>

        <div className="p-2 border-t">
          <button className="w-full text-sm text-primary text-center p-2 hover:bg-accent/30 rounded transition-colors">
            Mark all as read
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
