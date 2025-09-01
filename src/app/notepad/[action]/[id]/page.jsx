// app/notepad/[action]/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiSave, FiArrowLeft } from "react-icons/fi";

export default function NoteForm() {
  const router = useRouter();
  const params = useParams();
  const { action, id } = params;
  const isEdit = action === "edit";

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    clipboard: "",
  });

  useEffect(() => {
    if (isEdit && id) {
      fetchNote();
    }
  }, [isEdit, id]);

  const fetchNote = async () => {
    try {
      const res = await fetch(`/api/notepad/${id}`);
      const note = await res.json();
      setFormData({
        title: note.title,
        description: note.description,
        clipboard: note.clipboard || "",
      });
    } catch (error) {
      console.error("Error fetching note:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isEdit ? `/api/notepad/${id}` : "/api/notepad";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/notepad");
      } else {
        console.error("Error saving note");
      }
    } catch (error) {
      console.error("Error saving note:", error);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#3fb950]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-[#58a6ff] hover:text-[#79c0ff] mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to Notes
        </button>

        <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
          <div className="border-b border-[#30363d] px-6 py-4 bg-[#161b22]">
            <h1 className="text-xl font-bold text-[#f0f6fc]">
              {isEdit ? "Edit Note" : "Create New Note"}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-[#f0f6fc]">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent outline-none text-[#c9d1d9]"
                required
                placeholder="Enter note title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#f0f6fc]">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent outline-none text-[#c9d1d9]"
                required
                placeholder="Enter note description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#f0f6fc]">
                Code/Clipboard Content
              </label>
              <textarea
                name="clipboard"
                value={formData.clipboard}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent outline-none text-[#c9d1d9] font-mono text-sm"
                placeholder="Paste code or any text content here..."
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d] rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white rounded-md flex items-center"
              >
                <FiSave className="mr-2" />
                {saving ? "Saving..." : isEdit ? "Update Note" : "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}