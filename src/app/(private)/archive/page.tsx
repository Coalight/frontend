import { Archive } from "lucide-react";

export default function ArchivePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <Archive size={100} className="text-gray-700 mb-4" />
      <h1 className="text-6xl font-[900] text-gray-200 mb-2">Archive</h1>
      <p className="text-gray-400 text-xl text-center font-[600]">
        Your archived courses will appear here.
      </p>
    </div>
  );
}
