"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiArrowLeft, FiEdit, FiTrash2 } from "react-icons/fi";

export default function NoteView() {
  const router = useRouter();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNote();
  }, [id]);

  const fetchNote = async () => {
    try {
      const res = await fetch(`/api/notepad/${id}`);
      const noteData = await res.json();
      setNote(noteData);
    } catch (error) {
      console.error("Error fetching note:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      const res = await fetch(`/api/notepad/${id}`, { method: "DELETE" });
      if (res.ok) router.push("/notepad");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#3fb950]"></div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#f0f6fc] mb-4">Note not found</h1>
          <button onClick={() => router.push("/notepad")} className="text-[#58a6ff] hover:underline">
            Back to notes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center text-[#58a6ff] hover:text-[#79c0ff] mb-6">
          <FiArrowLeft className="mr-2" /> Back to Notes
        </button>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-[#30363d] px-6 py-4 bg-[#161b22] flex justify-between items-center">
            <h1 className="text-xl font-bold text-[#f0f6fc]">{note.title}</h1>
            <div className="flex space-x-2">
              <button onClick={() => router.push(`/notepad/edit/${note._id}`)} className="text-[#8b949e] hover:text-[#58a6ff] p-1">
                <FiEdit size={18} />
              </button>
              <button onClick={deleteNote} className="text-[#8b949e] hover:text-[#f85149] p-1">
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-sm font-medium mb-2 text-[#f0f6fc]">Description</h2>
              <p className="text-[#c9d1d9] whitespace-pre-wrap">{note.description}</p>
            </div>

            {note.clipboard && (
              <div>
                <h2 className="text-sm font-medium mb-2 text-[#f0f6fc]">Code/Content</h2>
                <pre className="bg-[#0d1117] p-4 rounded-md overflow-x-auto text-sm font-mono">
                  <code className="text-[#c9d1d9]">{note.clipboard}</code>
                </pre>
              </div>
            )}

            <div className="pt-4 border-t border-[#30363d] text-sm text-[#8b949e]">
              <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
              <p>Last updated: {new Date(note.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
