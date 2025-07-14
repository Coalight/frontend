import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerFieldProps {
  value: number; // Unix timestamp in milliseconds
  onChange: (timestamp: number) => void;
}

export const DatePickerField = ({ value, onChange }: DatePickerFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Convert timestamp to Date for the calendar
  const dateValue = new Date(value);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    onChange(date.getTime());
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal")}
          aria-label="Select date"
        >
          <Calendar className="mr-2 h-4 w-4" />
          {format(dateValue, "PPP")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarPicker
          mode="single"
          selected={dateValue}
          onSelect={handleDateSelect}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </PopoverContent>
    </Popover>
  );
};
