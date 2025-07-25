"use client";

import { Plus, Settings, X, Copy, Check } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function HeaderAction() {
  const [showModal, setShowModal] = useState<"student" | "instructor" | null>(
    null
  );
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(`Adding ${showModal} with email:`, email);

    toast.success(
      `${showModal === "student" ? "Student" : "Instructor"} added successfully`
    );
    setShowModal(null);
    setEmail("");
  };

  const copyJoinUrl = () => {
    navigator.clipboard.writeText(`${window.location.origin}/join/course-id`);
    toast.success("Join URL copied to clipboard");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="absolute top-0 right-20 z-40 justify-end flex items-center gap-2">
      <div className="flex gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gpa-1">
              <Plus className="h-5 w-5" />
              Add New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => setShowModal("student")}
              className="cursor-pointer"
            >
              Add New Student
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setShowModal("instructor")}
              className="cursor-pointer"
            >
              Add New Instructor
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(null)}
          />

          {/* Modal Content */}
          <div className="relative z-50 w-full max-w-md rounded-lg bg-background p-6 shadow-lg border border-border">
            <button
              onClick={() => setShowModal(null)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                Add New {showModal === "student" ? "Student" : "Instructor"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="user@example.com"
                  />
                </div>

                {showModal === "student" && (
                  <div className="space-y-2">
                    <Label>Or share joining link</Label>
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm">
                        {`${window.location.origin}/join/course-id`}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={copyJoinUrl}
                        className="h-9 w-9"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Note: The user must have an account with this email address.
                </p>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add {showModal === "student" ? "Student" : "Instructor"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
