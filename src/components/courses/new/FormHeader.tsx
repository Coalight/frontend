import { PlusCircle } from "lucide-react";

export const FormHeader = () => (
  <div className="flex items-center gap-3 mb-6">
    <PlusCircle className="h-6 w-6 text-primary" />
    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
      Create New Course
    </h2>
  </div>
);
