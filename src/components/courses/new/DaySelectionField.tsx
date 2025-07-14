import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DAYS_OF_WEEK = [
  { value: "sun", label: "Sunday" },
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
];

export const DaySelectionField = ({
  selectedDays,
  onToggleDay,
}: {
  selectedDays: string[];
  onToggleDay: (day: string) => void;
  error?: string;
}) => (
  <div className="space-y-2">
    <div className="flex flex-wrap gap-2">
      {DAYS_OF_WEEK.map((day) => (
        <Button
          key={day.value}
          type="button"
          variant={selectedDays.includes(day.value) ? "default" : "outline"}
          onClick={() => onToggleDay(day.value)}
          className={cn("transition-colors")}
          aria-label={`Select ${day.label}`}
        >
          {day.label}
        </Button>
      ))}
    </div>
  </div>
);
