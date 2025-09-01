"use client"
import ActivityHeatmap from "@/components/ActivityHeatmap";
import { ArrowLeft } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-[#7d8590] hover:text-[#f0f6fc] transition-colors mr-4"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-semibold text-[#f0f6fc]">Activity</h2>
      </div>
      <ActivityHeatmap />
    </div>
  );
}
