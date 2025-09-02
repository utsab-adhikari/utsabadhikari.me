// app/schedules/page.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FiPlus, FiEdit, FiTrash2, FiEye, FiCalendar, FiClock } from "react-icons/fi";

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    if (isAdmin) {
      fetchSchedules();
    }
  }, [isAdmin]);

  const fetchSchedules = async () => {
    try {
      const res = await fetch("/api/schedules");
      const data = await res.json();
      setSchedules(data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSchedule = async (id) => {
    if (!confirm("Are you sure you want to delete this schedule?")) return;
    
    try {
      const res = await fetch(`/api/schedules/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSchedules(schedules.filter(schedule => schedule._id !== id));
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#f0f6fc] mb-4">Access Denied</h1>
          <p className="text-[#8b949e] mb-4">You need admin privileges to access this page.</p>
          <Link href="/" className="text-[#58a6ff] hover:underline">
            Back to home
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
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#f0f6fc] flex items-center">
            <FiCalendar className="mr-2" /> Schedules
          </h1>
          <Link
            href="/schedules/new"
            className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded-md flex items-center"
          >
            <FiPlus className="mr-2" /> New Schedule
          </Link>
        </div>

        {schedules.length === 0 ? (
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-8 text-center">
            <FiCalendar className="mx-auto text-4xl text-[#8b949e] mb-4" />
            <h2 className="text-xl font-medium text-[#f0f6fc] mb-2">
              No schedules yet
            </h2>
            <p className="text-[#8b949e] mb-4">
              Get started by creating your first schedule
            </p>
            <Link
              href="/schedules/new"
              className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded-md inline-flex items-center"
            >
              <FiPlus className="mr-2" /> Create your first schedule
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedules.map((schedule) => (
              <div
                key={schedule._id}
                className="bg-[#161b22] border border-[#30363d] rounded-md p-4 hover:border-[#58a6ff] transition-colors"
              >
                <h3 className="font-semibold text-[#f0f6fc] mb-2">{schedule.title}</h3>
                <p className="text-[#8b949e] text-sm mb-4 line-clamp-3">
                  {schedule.description}
                </p>
                
                {schedule.content && schedule.content.length > 0 && (
                  <div className="bg-[#0d1117] p-2 rounded-md mb-4">
                    <div className="flex items-center text-xs text-[#8b949e] mb-2">
                      <FiClock className="mr-1" />
                      <span>{schedule.content.length} item(s)</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#8b949e]">
                    {new Date(schedule.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <Link
                      href={`/schedules/view/${schedule._id}`}
                      className="text-[#8b949e] hover:text-[#58a6ff] p-1"
                      title="View Schedule"
                    >
                      <FiEye size={16} />
                    </Link>
                    <Link
                      href={`/schedules/edit/${schedule._id}`}
                      className="text-[#8b949e] hover:text-[#58a6ff] p-1"
                      title="Edit Schedule"
                    >
                      <FiEdit size={16} />
                    </Link>
                    <button
                      onClick={() => deleteSchedule(schedule._id)}
                      className="text-[#8b949e] hover:text-[#f85149] p-1"
                      title="Delete Schedule"
                    >
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