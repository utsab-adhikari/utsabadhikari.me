"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TrackerListPage() {
  const [trackers, setTrackers] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", description: "" });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const res = await fetch("/api/tracker");
    const data = await res.json();
    setTrackers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/tracker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, status: "pending" }),
    });
    setForm({ title: "", date: "", description: "" });
    setLoading(false);
    load();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Form Section */}
      <section className="bg-[#161b22] rounded-md p-4 border border-[#30363d]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#f0f6fc]">Create New Tracker</h2>
          <Link
            href="/tracker/report"
            className="px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-sm text-[#f0f6fc] font-medium transition-colors border border-[#30363d]"
          >
            Generate Report
          </Link>
        </div>
        
        <form onSubmit={submit} className="space-y-3">
          <div className="grid md:grid-cols-3 gap-3">
            <input
              className="bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 placeholder-[#7d8590] focus:outline-none focus:ring-2 focus:ring-[#1f6feb] text-sm"
              placeholder="Title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              type="date"
              className="bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 placeholder-[#7d8590] focus:outline-none focus:ring-2 focus:ring-[#1f6feb] text-sm"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <input
              className="bg-[#0d1117] border border-[#30363d] rounded-md p-2.5 placeholder-[#7d8590] focus:outline-none focus:ring-2 focus:ring-[#1f6feb] text-sm"
              placeholder="Short description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <button
            disabled={loading}
            className="px-4 py-2 w-full md:w-auto rounded-md bg-[#238636] hover:bg-[#2ea043] transition-colors disabled:opacity-50 font-medium text-sm text-[#f0f6fc]"
          >
            {loading ? "Saving..." : "Add Tracker"}
          </button>
        </form>
      </section>

      {/* Tracker List Section */}
      <section>
        <h2 className="text-xl font-semibold text-[#f0f6fc] mb-4">Study Trackers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trackers.map((t) => (
            <article
              key={t._id}
              className="rounded-md border border-[#30363d] bg-[#161b22] p-4 flex flex-col justify-between hover:border-[#3fb950] transition-colors"
            >
              <div className="space-y-2">
                <h3 className="text-md font-semibold text-[#f0f6fc] truncate">
                  {t.title}
                </h3>
                <p className="text-xs text-[#7d8590]">
                  {new Date(t.date).toDateString()} • {t.status}
                </p>
                <p className="text-sm text-[#7d8590] line-clamp-3">{t.description}</p>
              </div>
              <Link
                href={`/tracker/${t._id}`}
                className="mt-3 inline-block px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-sm text-[#f0f6fc] text-center font-medium transition-colors border border-[#30363d]"
              >
                Open
              </Link>
            </article>
          ))}

          {trackers.length === 0 && (
            <p className="text-[#7d8590] col-span-full text-center py-8">
              No trackers yet. Add your first study entry above.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}