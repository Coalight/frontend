type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface Course {
  id: string;
  title: string;
  code: string;
  created_by: string;
  created_at: Date | string; // Date object and ISO string
  description: string;
  credits: string;
  start_date: number | string; // Unix timestamp (number) or string representation
  class_days: DayOfWeek[]; 
  total_students: number;
  
 
  instructor?: {
    id: string;
    name: string;
    email: string;
  };
  currentUserRole?: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN' | 'MODERATOR';
  totalStudents?: number;
}