import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CourseJoiningLink({
  courseId,
  joiningCode,
}: {
  courseId: string;
  joiningCode: string;
}) {
  const [copied, setCopied] = useState(false);

  const joinUrl = `${window.location.origin}/join/${courseId}?code=${joiningCode}`;
  const copyJoinUrl = () => {
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-2 items-center max-w-lg mx-auto">
      <div className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm">
        {joinUrl.slice(0, 50) + (joinUrl.length > 50 ? "..." : "")}
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
  );
}
