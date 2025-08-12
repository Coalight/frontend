"use client";

import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { EventType } from "@/types/event";
import { CreateEventDialogProps, EventFormData } from "./types";
import { EventVisualSidebar } from "./EventVisualSidebar";
import { EventForm } from "./EventForm";
import { isValidUrl, getDefaultDate, getDefaultTime } from "./utils";

export function CreateEventDialog({
  courseId,
  onEventCreated,
}: CreateEventDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<EventFormData>({
    title: "",
    description: "",
    type: "other",
    date: getDefaultDate(),
    time: getDefaultTime(),
    url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const processedData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      url: formData.url.trim(),
    };

    if (
      !processedData.title ||
      !processedData.date ||
      !processedData.time ||
      !processedData.type
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (processedData.url && !isValidUrl(processedData.url)) {
      toast.error("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/courses/events", {
        method: "POST",
        body: JSON.stringify({ ...processedData, courseId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to create event.");
        return;
      }
      toast.success("Event created successfully!");

      onEventCreated();
      setOpen(false);
      setFormData({
        title: "",
        description: "",
        type: "other",
        date: getDefaultDate(),
        time: getDefaultTime(),
        url: "",
      });
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (
    key: keyof EventFormData,
    value: string | EventType
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="gap-2 bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <div className="flex">
          <EventVisualSidebar selectedType={formData.type} />
          <EventForm
            formData={formData}
            updateFormData={updateFormData}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
