"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await axios.get("/api/v1/hireme");
        setApps(res.data.apps || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchApps();
    }
  }, [session, status]);

  // Accept application
  const handleAccept = async (id) => {
    try {
      setProcessingId(id);
      await axios.put(`/api/v1/hireme/accept/${id}`);
      setApps((prev) =>
        prev.map((app) => (app._id === id ? { ...app, isAccepted: true } : app))
      );
    } catch (error) {
      console.error("Error accepting:", error);
    } finally {
      setProcessingId(null);
    }
  };

  // Delete application
  const handleDelete = async (id) => {
    try {
      setProcessingId(id);
      await axios.delete(`/api/v1/hireme/delete/${id}`);
      setApps((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setProcessingId(null);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1f6feb]"></div>
        <p className="ml-3 text-[#7d8590] text-sm">Loading Applications</p>
      </div>
    );
  }

  if (status === "authenticated" && session?.user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <p className="text-[#7d8590]">Access denied. Admin only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-[#7d8590] hover:text-[#f0f6fc] transition-colors mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-[#f0f6fc]">Manage Applications</h1>
        </div>

        {apps.length === 0 ? (
          <p className="text-center text-[#7d8590] py-8">No applications found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apps.map((app, i) => (
              <motion.div
                key={app._id}
                className="bg-[#161b22] rounded-md p-4 border border-[#30363d] space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <h2 className="text-md font-medium text-[#2f81f7]">
                  {app.companyName}
                </h2>
                <p className="text-[#7d8590] text-xs">{app.email}</p>
                <p className="text-[#7d8590] text-xs">
                  <span className="font-medium">Address:</span> {app.address}
                </p>
                <p className="text-[#7d8590] text-xs">
                  <span className="font-medium">Category:</span> {app.category}
                </p>
                <p className="text-[#7d8590] text-xs">
                  <span className="font-medium">Contact:</span> {app.contact}
                </p>
                <p className="text-[#7d8590] text-xs">
                  <span className="font-medium">Source:</span> {app.source}
                </p>
                <p className="text-[#7d8590] text-xs line-clamp-3">
                  <span className="font-medium">Description:</span>{" "}
                  {app.description}
                </p>

                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => handleAccept(app._id)}
                    disabled={processingId === app._id || app.isAccepted}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition ${
                      app.isAccepted
                        ? "bg-[#196c2e] text-[#f0f6fc]"
                        : "bg-[#238636] hover:bg-[#2ea043] text-[#f0f6fc]"
                    }`}
                  >
                    {processingId === app._id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <CheckCircle size={14} />
                    )}
                    {app.isAccepted ? "Accepted" : "Accept"}
                  </button>

                  <button
                    onClick={() => handleDelete(app._id)}
                    disabled={processingId === app._id}
                    className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#da3633] hover:bg-[#f85149] transition text-xs text-[#f0f6fc]"
                  >
                    {processingId === app._id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}