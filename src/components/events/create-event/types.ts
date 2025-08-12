import { EventType } from "@/types/event";

export interface CreateEventDialogProps {
  courseId: string;
  onEventCreated: () => void;
}

export interface EventFormData {
  title: string;
  description: string;
  type: EventType;
  date: string;
  time: string;
  url: string;
}

export interface EventTypeOption {
  value: EventType;
  label: string;
  icon: React.ElementType;
}

export interface EventFormProps {
  formData: EventFormData;
  updateFormData: (key: keyof EventFormData, value: string | EventType) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export interface EventVisualSidebarProps {
  selectedType: EventType;
}
