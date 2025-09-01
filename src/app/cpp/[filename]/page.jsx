"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiCopy, FiPlay, FiClock, FiArrowLeft, FiEdit } from "react-icons/fi";
import { Editor } from "@monaco-editor/react";
import { useSession } from "next-auth/react";

export default function CppFileView() {
  const { filename } = useParams();
  const { data: session, status } = useSession();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Set to true for admin, adjust according to session

  useEffect(() => {
    fetch(`/api/cpp/${filename}`)
      .then((res) => res.json())
      .then((data) => {
        setFile(data);
        setLoading(false);
      });

    setIsAdmin(session?.user?.role === "admin");
  }, [filename]);

  const copyCode = () => {
    navigator.clipboard.writeText(file.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runCode = async () => {
    setRunning(true);
    setOutput("Running code...");
    try {
      const res = await fetch("/api/cpp/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: file.code }),
      });
      const result = await res.json();
      setOutput(result.output || result.error || "No output");
    } catch (err) {
      setOutput("Error: " + err.message);
    } finally {
      setRunning(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-2 border-t-[#3fb950] border-b-[#3fb950] rounded-full"></div>
      </div>
    );

  if (!file)
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#f0f6fc] mb-4">
            File not found
          </h1>
          <Link href="/cpp" className="text-[#58a6ff] hover:underline">
            Back to files
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4 sm:p-6 flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full flex-1">
        <div className="mb-4">
          <Link
            href="/cpp"
            className="text-[#58a6ff] hover:underline flex items-center"
          >
            <FiArrowLeft className="mr-2" /> Back to files
          </Link>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden mb-6">
          <div className="border-b border-[#30363d] px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h1 className="text-xl font-bold text-[#f0f6fc]">
              {file.filename}
            </h1>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              {isAdmin && (
                <Link
                  href={`/cpp/edit/${file.filename}`}
                  className="px-3 py-1 rounded-md bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] text-sm flex items-center"
                >
                  <FiEdit className="mr-1" /> Edit
                </Link>
              )}
              <button
                onClick={copyCode}
                disabled={copied}
                className={`px-3 py-1 rounded-md text-sm flex items-center ${
                  copied
                    ? "bg-[#3fb950] text-white"
                    : "bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]"
                }`}
              >
                <FiCopy className="mr-1" /> {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={runCode}
                disabled={running}
                className={`px-3 py-1 rounded-md text-sm flex items-center ${
                  running
                    ? "bg-[#3fb950] text-white"
                    : "bg-[#1f6feb] text-white hover:bg-[#388bfd]"
                }`}
              >
                <FiPlay className="mr-1" /> {running ? "Running..." : "Run"}
              </button>
            </div>
          </div>

          <div className="p-4">
            {file.description && (
              <p className="text-[#8b949e] mb-4">{file.description}</p>
            )}

            <div>
              <label className="block text-sm mb-2 text-[#f0f6fc]">
                Program
              </label>
              <Editor
                className="min-h-[200px]"
                defaultLanguage="cpp"
                theme="vs-dark"
                value={file.code}
                options={{
                  readOnly: true,
                  overviewRulerBorder: false,
                  lineNumbers: "off",
                  minimap: { enabled: false },
                  fontSize: 14,
                  automaticLayout: true,
                }}
              />
            </div>

            <div className="mt-4 text-sm text-[#8b949e] flex items-center">
              <FiClock className="mr-1" />
              Last updated: {new Date(file.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>

        {output && (
          <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
            <div className="border-b border-[#30363d] px-4 py-2 bg-[#161b22] text-sm font-medium">
              Output
            </div>
            <div className="p-4">
              <pre className="whitespace-pre-wrap text-sm">{output}</pre>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#30363d] p-4 mt-6 text-center text-[#8b949e] text-sm">
        Created by Utsab • C++ Code Manager • Built with Next.js, MongoDB,
        Tailwind CSS
      </footer>
    </div>
  );
}
