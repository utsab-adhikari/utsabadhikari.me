"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Editor from "@/components/tracker/Editor";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function TrackerDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [doc, setDoc] = useState(null);
  const [newTask, setNewTask] = useState({ name: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const load = async () => {
    const res = await fetch(`/api/tracker/${id}`);
    const data = await res.json();
    setDoc(data);
  };
  
  useEffect(() => {
    load();
  }, [id]);

  const savePatch = async (patch) => {
    setSaving(true);
    const res = await fetch(`/api/tracker/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...doc, ...patch }),
    });
    const data = await res.json();
    setDoc(data);
    setSaving(false);
  };

  const addTask = async () => {
    if (!newTask.name.trim()) return;
    const res = await fetch(`/api/tracker/${id}/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const data = await res.json();
    setDoc(data);
    setNewTask({ name: "", notes: "" });
  };

  const toggleTask = async (index) => {
    const res = await fetch(`/api/tracker/${id}/task`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        index,
        patch: { completed: !doc.tasks[index].completed },
      }),
    });
    const data = await res.json();
    setDoc(data);
  };

  const updateTaskNotes = async (index, notes) => {
    const res = await fetch(`/api/tracker/${id}/task`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index, patch: { notes } }),
    });
    const data = await res.json();
    setDoc(data);
  };

  const deleteTask = async (index) => {
    const res = await fetch(`/api/tracker/${id}/task`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });
    const data = await res.json();
    setDoc(data);
  };

  const submitReport = async () => {
    await savePatch({ reportSubmitted: true, reportHtml: doc.editorContent });
  };

  const destroy = async () => {
    if (confirm("Are you sure you want to delete this tracker?")) {
      await fetch(`/api/tracker/${id}`, { method: "DELETE" });
      router.push("/tracker");
    }
  };

  if (!doc) return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <p className="text-[#7d8590]">Loading…</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f0f6fc]">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold truncate">{doc.title}</h1>
            <p className="text-xs text-[#7d8590] mt-1">
              {new Date(doc.date).toDateString()} • Created{" "}
              {new Date(doc.createdAt).toLocaleString()}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Link
              href="/tracker"
              className="px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-xs text-[#f0f6fc] transition-colors border border-[#30363d] flex items-center"
            >
              {isMobile ? "Back" : "Back to List"}
            </Link>
            
            <a
              href={`/tracker/${id}/public`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-[#1f6feb] hover:bg-[#388bfd] text-xs text-[#f0f6fc] transition-colors flex items-center"
            >
              <EyeIcon className="h-3.5 w-3.5 mr-1" />
              {isMobile ? "View" : "Public View"}
            </a>
            
            <button
              onClick={destroy}
              className="px-3 py-1.5 rounded-md bg-[#da3633] hover:bg-[#f85149] text-xs text-[#f0f6fc] transition-colors"
            >
              {isMobile ? "Delete" : "Delete Tracker"}
            </button>
          </div>
        </div>

        {/* Meta form */}
        <section className="bg-[#161b22] rounded-md p-4 border border-[#30363d]">
          <h2 className="text-md font-semibold mb-3">Tracker Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select
              value={doc.status}
              onChange={(e) => savePatch({ status: e.target.value })}
              className="bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="started">Started</option>
              <option value="completed">Completed</option>
            </select>
            <input
              type="date"
              value={doc.date?.slice(0, 10)}
              onChange={(e) => savePatch({ date: e.target.value })}
              className="bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-sm"
            />
            <input
              value={doc.description || ""}
              onChange={(e) => setDoc({ ...doc, description: e.target.value })}
              onBlur={() => savePatch({ description: doc.description })}
              placeholder="Description"
              className="bg-[#0d1117] border border-[#30363d] rounded-md p-2 text-sm"
            />
          </div>
        </section>

        {/* Rich text editor */}
        <section className="bg-[#161b22] rounded-md p-4 border border-[#30363d]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-md font-semibold">General Notes</h2>
            {saving && <span className="text-xs text-[#7d8590]">Saving…</span>}
          </div>
          <Editor
            content={doc.editorContent}
            onChange={(html) => savePatch({ editorContent: html })}
          />
        </section>

        {/* Tasks */}
        <section className="bg-[#161b22] rounded-md p-4 border border-[#30363d]">
          <h2 className="text-md font-semibold mb-3">Tasks</h2>
          
          {doc.tasks?.length > 0 ? (
            <div className="space-y-2 mb-3">
              {doc.tasks.map((t, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 rounded-md border border-[#30363d] bg-[#0d1117] p-3"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggleTask(i)}
                      className="h-4 w-4 accent-[#3fb950] flex-shrink-0"
                    />
                    <span
                      className={`flex-1 text-sm ${
                        t.completed ? "line-through text-[#7d8590]" : ""
                      }`}
                    >
                      {t.name}
                    </span>
                    <button
                      onClick={() => deleteTask(i)}
                      className="px-2 py-1 rounded-md bg-[#da3633] hover:bg-[#f85149] text-xs text-[#f0f6fc] transition-colors flex-shrink-0"
                    >
                      Delete
                    </button>
                  </div>
                  <textarea
                    placeholder="Task notes..."
                    className="bg-[#161b22] border border-[#30363d] rounded-md p-2 text-xs"
                    value={t.notes}
                    onChange={(e) => updateTaskNotes(i, e.target.value)}
                    rows={2}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#7d8590] text-sm text-center py-4">
              No tasks yet. Add your first task below.
            </p>
          )}

          {/* Add task */}
          <div className="rounded-md border border-[#30363d] bg-[#0d1117] p-3 flex flex-col gap-2">
            <input
              className="bg-[#161b22] border border-[#30363d] rounded-md p-2 text-sm"
              placeholder="New task name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            />
            <textarea
              className="bg-[#161b22] border border-[#30363d] rounded-md p-2 text-sm"
              placeholder="Optional notes"
              value={newTask.notes}
              onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
              rows={2}
            />
            <div className="flex justify-end">
              <button
                onClick={addTask}
                disabled={!newTask.name.trim()}
                className="px-3 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed text-xs text-[#f0f6fc] transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        </section>

        {/* Reporting */}
        <section className="bg-[#161b22] rounded-md p-4 border border-[#30363d]">
          <h2 className="text-md font-semibold mb-3">Report</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <button
              onClick={submitReport}
              className="px-3 py-1.5 rounded-md bg-[#1f6feb] hover:bg-[#388bfd] text-xs text-[#f0f6fc] transition-colors w-full md:w-auto"
            >
              {doc.reportSubmitted ? "Rebuild Report" : "Submit Report"}
            </button>
            <span className="text-xs text-[#7d8590] text-center md:text-left">
              Report stores a snapshot of the notes as HTML.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}