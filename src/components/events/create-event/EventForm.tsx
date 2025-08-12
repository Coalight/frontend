import React from "react";
import { motion } from "framer-motion";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Link } from "lucide-react";
import { EventType } from "@/types/event";
import { EventFormProps } from "./types";
import { eventTypes } from "./constants";
import { getDefaultDate } from "./utils";

export const EventForm: React.FC<EventFormProps> = ({
  formData,
  updateFormData,
  loading,
  onSubmit,
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="w-full sm:w-2/3 p-8 bg-background"
    >
      <DialogHeader>
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Create New Event
          </DialogTitle>
        </motion.div>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="event-title"
            className="font-medium text-gray-700 dark:text-gray-300"
          >
            Event Title
          </Label>
          <Input
            id="event-title"
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            placeholder="Mid-term Exam"
            aria-required="true"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="event-type"
            className="font-medium text-gray-700 dark:text-gray-300"
          >
            Event Type
          </Label>
          <Select
            value={formData.type}
            onValueChange={(value: EventType) => updateFormData("type", value)}
          >
            <SelectTrigger id="event-type" aria-required="true">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    <type.icon className="h-4 w-4" />
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="event-date"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              Event Date
            </Label>
            <Input
              id="event-date"
              type="date"
              value={formData.date}
              onChange={(e) => updateFormData("date", e.target.value)}
              min={getDefaultDate()}
              aria-required="true"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="event-time"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              Event Time
            </Label>
            <Input
              id="event-time"
              type="time"
              value={formData.time}
              onChange={(e) => updateFormData("time", e.target.value)}
              aria-required="true"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="event-url"
            className="font-medium text-gray-700 dark:text-gray-300"
          >
            Event URL
          </Label>
          <div className="relative">
            <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              id="event-url"
              type="url"
              value={formData.url}
              onChange={(e) => updateFormData("url", e.target.value)}
              placeholder="https://example.com/meeting (Optional)"
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="event-description"
            className="font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </Label>
          <Textarea
            id="event-description"
            value={formData.description}
            onChange={(e) => updateFormData("description", e.target.value)}
            placeholder="Event details... (Optional)"
            className="resize-none h-24"
          />
        </div>

        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              className="border-gray-300 dark:border-gray-600"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={loading}
            className=" text-white  dark:text-gray-900 w-32"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Create Event"
            )}
          </Button>
        </DialogFooter>
      </form>
    </motion.div>
  );
};
