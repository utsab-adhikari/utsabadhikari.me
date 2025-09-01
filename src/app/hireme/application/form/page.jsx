"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/home/Footer";

export default function HireMeApplicationForm() {
  const [form, setForm] = useState({
    companyName: "",
    address: "",
    email: "",
    category: "",
    contact: "",
    description: "",
    source: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/v1/hireme/create", form);
      setMessage(res.data.message);
      setForm({
        companyName: "",
        address: "",
        email: "",
        category: "",
        contact: "",
        description: "",
        source: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] py-6 px-4">
      <div className="min-h-[75vh] max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-[#7d8590] hover:text-[#f0f6fc] transition-colors mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold text-[#f0f6fc]">
            Hire Me Application
          </h2>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded-md bg-[#0d1117] text-[#f0f6fc] placeholder-[#7d8590] border border-[#30363d] focus:outline-none focus:ring-2 focus:ring-[#1f6feb] transition text-sm"
            />
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded-md bg-[#0d1117] text-[#f0f6fc] placeholder-[#7d8590] border border-[#30363d] focus:outline-none focus:ring-2 focus:ring-[#1f6feb] transition text-sm"
            />
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded-md bg-[#0d1117] text-[#f0f6fc] placeholder-[#7d8590] border border-[#30363d] focus:outline-none focus:ring-2 focus:ring-[#1f6feb] transition text-sm"
            />
            <input
              name="contact"
              placeholder="Contact Number"
              value={form.contact}
              onChange={handleChange}
              className="px-3 py-2 rounded-md bg-[#0d1117] text-[#f0f6fc] placeholder-[#7d8590] border border-[#30363d] focus:outline-none focus:ring-2 focus:ring-[#1f6feb] transition text-sm"
            />

            {/* Category Dropdown */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded-md bg-[#0d1117] text-[#f0f6fc] border border-[#30363d] focus:outline-none focus:ring-2 focus:ring-[#1f6feb] transition text-sm"
            >
              <option value="">Select Category</option>
              <option value="remote">Remote</option>
              <option value="internship">Internship</option>
              <option value="job">Job</option>
              <option value="parttime">Part-time</option>
            </select>

            {/* Source Dropdown */}
            <select
              name="source"
              value={form.source}
              onChange={handleChange}
              className="px-3 py-2 rounded-md bg-[#0d1117] text-[#f0f6fc] border border-[#30363d] focus:outline-none focus:ring-2 focus:ring-[#1f6feb] transition text-sm"
            >
              <option value="">How did you find me?</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
              <option value="github">GitHub</option>
              <option value="portfolio">Portfolio Website</option>
              <option value="other">Other</option>
            </select>
          </div>

          <textarea
            name="description"
            placeholder="Describe your requirements..."
            rows={4}
            value={form.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-[#0d1117] text-[#f0f6fc] placeholder-[#7d8590] border border-[#30363d] focus:outline-none focus:ring-2 focus:ring-[#1f6feb] transition text-sm"
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#238636] rounded-md font-medium hover:bg-[#2ea043] transition-colors text-sm text-[#f0f6fc]"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>

          {message && (
            <p className="text-center mt-4 text-[#7d8590] text-sm">{message}</p>
          )}
        </motion.form>
      </div>
      <div className="p-4">
        <Footer />
      </div>
    </div>
  );
}
