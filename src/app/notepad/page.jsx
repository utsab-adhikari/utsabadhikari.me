"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiPlus, FiEdit, FiTrash2, FiFileText, FiEye } from "react-icons/fi";
import { ArrowLeft } from "lucide-react";

export default function NotepadPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notepad");
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      const res = await fetch(`/api/notepad/${id}`, { method: "DELETE" });
      if (res.ok) {
        setNotes(notes.filter(note => note._id !== id));
      }
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

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
           <div className="flex items-center mb-6">
                    <button
                      onClick={() => window.history.back()}
                      className="flex items-center text-[#7d8590] hover:text-[#f0f6fc] transition-colors mr-4"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-xl font-semibold text-[#f0f6fc]">Notepad</h2>
                  </div>
          <Link
            href="/notepad/new"
            className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded-md flex items-center transition"
          >
            <FiPlus className="mr-2" /> New Note
          </Link>
        </div>

        {notes.length === 0 ? (
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-8 text-center">
            <FiFileText className="mx-auto text-4xl text-[#8b949e] mb-4" />
            <h2 className="text-xl font-medium text-[#f0f6fc] mb-2">No notes yet</h2>
            <p className="text-[#8b949e] mb-4">Get started by creating your first note</p>
            <Link
              href="/notepad/new"
              className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded-md inline-flex items-center transition"
            >
              <FiPlus className="mr-2" /> Create your first note
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {notes.map(note => (
              <div
                key={note._id}
                className="bg-[#161b22] border border-[#30363d] rounded-md p-4 hover:border-[#58a6ff] transition-colors flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-[#f0f6fc] mb-2">{note.title}</h3>
                  <p className="text-[#8b949e] text-sm mb-3 line-clamp-3 whitespace-pre-wrap">
                    {note.description}
                  </p>
                  {note.clipboard && (
                    <div className="bg-[#0d1117] p-2 rounded-md mb-3 overflow-x-auto">
                      <code className="text-xs text-[#8b949e]">
                        {note.clipboard.substring(0, 100)}
                        {note.clipboard.length > 100 ? "..." : ""}
                      </code>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-[#8b949e]">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <Link href={`/notepad/view/${note._id}`} title="View Note" className="text-[#8b949e] hover:text-[#58a6ff] p-1">
                      <FiEye size={16} />
                    </Link>
                    <Link href={`/notepad/edit/${note._id}`} title="Edit Note" className="text-[#8b949e] hover:text-[#58a6ff] p-1">
                      <FiEdit size={16} />
                    </Link>
                    <button onClick={() => deleteNote(note._id)} title="Delete Note" className="text-[#8b949e] hover:text-[#f85149] p-1">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
