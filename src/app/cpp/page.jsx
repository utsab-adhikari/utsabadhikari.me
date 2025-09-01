// pages/cpp/index.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  FiFile,
  FiPlus,
  FiClock,
  FiCode,
  FiEdit,
  FiTrash2,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import Footer from "@/components/home/Footer";
import { ArrowLeft } from "lucide-react";

export default function CppFilesPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    fetch("/api/cpp/list")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id, filename) => {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) return;

    try {
      const res = await fetch(`/api/cpp/${filename}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFiles(files.filter((file) => file._id !== id));
      } else {
        alert("Failed to delete file");
      }
    } catch (error) {
      alert("Error deleting file");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#3fb950]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col">
      <main className="p-4 sm:p-6 flex-1">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <div className="flex items-center mb-6">
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-[#7d8590] hover:text-[#f0f6fc] transition-colors mr-4"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-semibold text-[#f0f6fc]">
                C++ Files
              </h2>
            </div>
            {isAdmin && (
              <Link
                href="/cpp/new"
                className="bg-[#238636] hover:bg-[#2ea043] text-white px-3 py-1.5 rounded-md flex items-center text-sm"
              >
                <FiPlus className="mr-2" /> New File
              </Link>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#3fb950]"></div>
            </div>
          ) : files.length === 0 ? (
            <div className="bg-[#161b22] border border-[#30363d] rounded-md p-6 sm:p-8 text-center">
              <FiFile className="mx-auto text-4xl text-[#8b949e] mb-4" />
              <h2 className="text-lg sm:text-xl font-medium text-[#f0f6fc] mb-2">
                No C++ files yet
              </h2>
              <p className="text-[#8b949e] mb-4 text-sm sm:text-base">
                {isAdmin
                  ? "Get started by creating your first C++ file"
                  : "No files available yet. Please check back later."}
              </p>
              {isAdmin && (
                <Link
                  href="/cpp/new"
                  className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded-md inline-flex items-center text-sm"
                >
                  <FiPlus className="mr-2" /> Create your first file
                </Link>
              )}
            </div>
          ) : (
            <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
              <div className="border-b border-[#30363d] px-3 sm:px-4 py-2 sm:py-3 bg-[#161b22] text-xs sm:text-sm text-[#8b949e]">
                {files.length} {files.length === 1 ? "file" : "files"}
              </div>
              <ul className="divide-y divide-[#30363d]">
                {files.map((file) => (
                  <li
                    key={file._id}
                    className="hover:bg-[#1c212a] transition-colors"
                  >
                    <div className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <Link
                        href={`/cpp/${file.filename}`}
                        className="flex-grow"
                      >
                        <div>
                          <h2 className="font-semibold text-[#58a6ff] flex items-center text-sm sm:text-base">
                            <FiFile className="mr-2 text-[#8b949e]" />{" "}
                            {file.filename}
                          </h2>
                          {file.description && (
                            <p className="text-[#8b949e] mt-1 text-xs sm:text-sm">
                              {file.description}
                            </p>
                          )}
                        </div>
                      </Link>

                      <div className="flex items-center flex-wrap justify-between sm:justify-end gap-3 sm:gap-4">
                        <div className="text-xs sm:text-sm text-[#8b949e] flex items-center">
                          <FiClock className="mr-1" />
                          {new Date(file.createdAt).toLocaleDateString()}
                        </div>

                        {isAdmin && (
                          <div className="flex space-x-2">
                            <Link
                              href={`/cpp/edit/${file.filename}`}
                              className="text-[#8b949e] hover:text-[#58a6ff] p-1"
                              title="Edit"
                            >
                              <FiEdit size={16} />
                            </Link>
                            <button
                              onClick={() =>
                                handleDelete(file._id, file.filename)
                              }
                              className="text-[#8b949e] hover:text-[#f85149] p-1"
                              title="Delete"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
