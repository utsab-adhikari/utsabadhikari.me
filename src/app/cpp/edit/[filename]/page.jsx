"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FiPlay, FiCopy, FiAlertCircle } from "react-icons/fi";
import Editor from "@monaco-editor/react";

export default function EditCppFile() {
  const { filename } = useParams();
  const [formData, setFormData] = useState({
    filename: "",
    description: "",
    code: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (filename) {
      fetch(`/api/cpp/${filename}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            filename: data.filename,
            description: data.description,
            code: data.code,
          });
          setLoading(false);
        });
    }
  }, [filename]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/cpp/${filename}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/cpp");
      } else {
        setSaving(false);
        const data = await res.json();
        alert("Error updating file: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setSaving(false);
      alert("Error: " + err.message);
    }
  };

  const runCode = async () => {
    setRunning(true);
    setOutput("");
    setError("");
    try {
      const res = await fetch("/api/cpp/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: formData.code }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setOutput(data.output || "No output");
      } else {
        setError(data.error || "Unknown error occurred while running code");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(formData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-[#3fb950] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4 sm:p-6 flex flex-col">
      <div className="w-full mx-auto flex-1">
        <div className="mb-4">
          <Link href="/cpp" className="text-[#58a6ff] hover:underline">
            ← Back to files
          </Link>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-md mb-6">
          <div className="border-b border-[#30363d] px-4 py-3">
            <h1 className="text-lg sm:text-xl font-bold text-[#f0f6fc]">
              Edit C++ File
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label className="block text-sm mb-2 text-[#f0f6fc]">
                Filename
              </label>
              <input
                value={formData.filename}
                disabled
                className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-sm text-[#8b949e] cursor-not-allowed"
              />
              <p className="text-xs text-[#8b949e] mt-1">
                Filename cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm mb-2 text-[#f0f6fc]">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={2}
                className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-sm focus:ring-2 focus:ring-[#58a6ff] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-[#f0f6fc]">
                Code *
              </label>
              <Editor
                className="min-h-[200px] max-h-[400px]"
                defaultLanguage="cpp"
                theme="vs-dark"
                value={formData.code}
                onChange={(value) => setFormData({ ...formData, code: value })}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  automaticLayout: true,
                }}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-between sm:justify-end">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={copyCode}
                  disabled={copied}
                  className={`px-4 py-2 rounded-md text-sm flex items-center ${
                    copied
                      ? "bg-[#3fb950] text-white"
                      : "bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]"
                  }`}
                >
                  <FiCopy className="mr-1" /> {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={runCode}
                  disabled={running}
                  className={`px-4 py-2 rounded-md text-sm flex items-center ${
                    running
                      ? "bg-[#3fb950] text-white"
                      : "bg-[#1f6feb] text-white hover:bg-[#388bfd]"
                  }`}
                >
                  <FiPlay className="mr-1" /> {running ? "Running..." : "Run"}
                </button>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded-md text-sm"
              >
                {saving ? "Updating..." : "Update File"}
              </button>
            </div>
          </form>
        </div>

        {/* Output / Error Console */}
        {(output || error) && (
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 mb-6 overflow-auto max-h-64">
            <h2 className="text-sm font-bold text-[#f0f6fc] mb-2 flex items-center">
              <FiAlertCircle className="mr-2" /> Console
            </h2>
            {output && (
              <pre className="text-[#c9d1d9] text-sm font-mono">{output}</pre>
            )}
            {error && (
              <pre className="text-[#f85149] text-sm font-mono">{error}</pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
