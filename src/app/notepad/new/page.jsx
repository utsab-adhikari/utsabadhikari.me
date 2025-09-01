// app/notepad/new/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiArrowLeft, FiFileText } from "react-icons/fi";

export default function NewNotePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    clipboard: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/notepad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/notepad");
        router.refresh();
      } else {
        console.error("Error creating note");
      }
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#58a6ff] hover:text-[#79c0ff] transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to Notes
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-[#f0f6fc] flex items-center">
            <FiFileText className="mr-2" /> New Note
          </h1>
          <div className="w-6"></div>
        </div>

        {/* Form Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-[#30363d] px-6 py-4 bg-[#161b22]">
            <h2 className="text-lg font-semibold text-[#f0f6fc]">Create New Note</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#f0f6fc]">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter note title"
                required
                disabled={saving}
                className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#c9d1d9] placeholder-[#8b949e] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent transition"
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#f0f6fc]">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Enter note description"
                required
                disabled={saving}
                className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#c9d1d9] placeholder-[#8b949e] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent transition resize-none"
              />
            </div>

            {/* Clipboard / Code Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#f0f6fc]">
                Code / Clipboard Content
              </label>
              <textarea
                name="clipboard"
                value={formData.clipboard}
                onChange={handleChange}
                rows={8}
                placeholder="Paste code or any text content here..."
                disabled={saving}
                className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#c9d1d9] placeholder-[#8b949e] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent transition resize-none"
              />
              <p className="text-xs text-[#8b949e] mt-1">
                Supports code snippets and text content
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-[#30363d]">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={saving}
                className="px-4 py-2 bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d] rounded-md transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white rounded-md flex items-center justify-center transition"
              >
                <FiSave className="mr-2" />
                {saving ? "Creating..." : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
