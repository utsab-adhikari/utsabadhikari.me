// app/schedules/[action]/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { FiSave, FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";
import Link from "next/link";

export default function ScheduleForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: [],
  });

  useEffect(() => {
    if (!isAdmin) {
      router.push("/schedules");
      return;
    }
  }, [isAdmin, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = "/api/schedules";
      const method = "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/schedules");
      } else {
        console.error("Error saving schedule");
      }
    } catch (error) {
      console.error("Error saving schedule:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addContentItem = () => {
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, { subTitle: "", date: "", time: "" }],
    }));
  };

  const removeContentItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const updateContentItem = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#f0f6fc] mb-4">
            Access Denied
          </h1>
          <p className="text-[#8b949e] mb-4">
            You need admin privileges to access this page.
          </p>
          <Link href="/schedules" className="text-[#58a6ff] hover:underline">
            Back to schedules
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#3fb950]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-[#58a6ff] hover:text-[#79c0ff] mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to Schedules
        </button>

        <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
          <div className="border-b border-[#30363d] px-6 py-4 bg-[#161b22]">
            <h1 className="text-xl font-bold text-[#f0f6fc]">
              {"Create New Schedule"}
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
                placeholder="Enter schedule title"
                disabled={saving}
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
                rows={4}
                className="w-full px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent outline-none text-[#c9d1d9]"
                required
                placeholder="Enter schedule description"
                disabled={saving}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-[#f0f6fc]">
                  Schedule Content
                </label>
                <button
                  type="button"
                  onClick={addContentItem}
                  className="flex items-center text-sm text-[#58a6ff] hover:text-[#79c0ff]"
                >
                  <FiPlus className="mr-1" /> Add Item
                </button>
              </div>

              {formData.content.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#0d1117] border border-[#30363d] rounded-md p-4 mb-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium text-[#f0f6fc]">
                      Item {index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeContentItem(index)}
                      className="text-[#8b949e] hover:text-[#f85149]"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-[#8b949e]">
                        Sub Title
                      </label>
                      <input
                        type="text"
                        value={item.subTitle}
                        onChange={(e) =>
                          updateContentItem(index, "subTitle", e.target.value)
                        }
                        className="w-full px-3 py-1 bg-[#161b22] border border-[#30363d] rounded-md text-sm text-[#c9d1d9]"
                        placeholder="Enter sub title"
                        disabled={saving}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1 text-[#8b949e]">
                        Date
                      </label>
                      <input
                        type="date"
                        value={item.date}
                        onChange={(e) =>
                          updateContentItem(index, "date", e.target.value)
                        }
                        className="w-full px-3 py-1 bg-[#161b22] border border-[#30363d] rounded-md text-sm text-[#c9d1d9]"
                        disabled={saving}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1 text-[#8b949e]">
                        Time
                      </label>
                      <input
                        type="time"
                        value={item.time}
                        onChange={(e) =>
                          updateContentItem(index, "time", e.target.value)
                        }
                        className="w-full px-3 py-1 bg-[#161b22] border border-[#30363d] rounded-md text-sm text-[#c9d1d9]"
                        disabled={saving}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {formData.content.length === 0 && (
                <div className="text-center text-[#8b949e] py-8 border border-[#30363d] border-dashed rounded-md">
                  <p>No content items added yet</p>
                  <button
                    type="button"
                    onClick={addContentItem}
                    className="text-[#58a6ff] hover:text-[#79c0ff] mt-2"
                  >
                    Add your first item
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-[#30363d]">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={saving}
                className="px-4 py-2 bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d] rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white rounded-md flex items-center transition-colors"
              >
                <FiSave className="mr-2" />
                {saving ? "Creating..." : "Create Schedule"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
