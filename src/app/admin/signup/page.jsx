"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Signup successful! Please login.");
        router.push("/auth/login");
      } else {
        setError(data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1117] p-4 sm:p-6">
      <div className="w-full max-w-md p-6 bg-[#161b22] border border-[#30363d] rounded-md">
        <h2 className="text-xl font-semibold text-[#f0f6fc] mb-4 text-center">
          Admin Signup
        </h2>
        <p className="text-xs text-center mb-5 text-[#da3633] font-medium">
          ⚠️ This portal is strictly for{" "}
          <span className="font-bold">Admin use only</span>.  
          Do not create an account if you are not authorized.  
          Misuse may result in account suspension or legal action.
        </p>

        {error && (
          <p className="bg-[#da3633]/20 text-[#f0f6fc] p-2 rounded text-sm mb-4 text-center border border-[#da3633]">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#f0f6fc] mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Utsab Adhikari"
              className="w-full px-3 py-2 border border-[#30363d] bg-[#0d1117] text-[#f0f6fc] rounded focus:ring-2 focus:ring-[#1f6feb] focus:border-[#1f6feb] placeholder-[#7d8590] text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#f0f6fc] mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              className="w-full px-3 py-2 border border-[#30363d] bg-[#0d1117] text-[#f0f6fc] rounded focus:ring-2 focus:ring-[#1f6feb] focus:border-[#1f6feb] placeholder-[#7d8590] text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#f0f6fc] mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-[#30363d] bg-[#0d1117] text-[#f0f6fc] rounded focus:ring-2 focus:ring-[#1f6feb] focus:border-[#1f6feb] placeholder-[#7d8590] text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#f0f6fc] mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-[#30363d] bg-[#0d1117] text-[#f0f6fc] rounded focus:ring-2 focus:ring-[#1f6feb] focus:border-[#1f6feb] placeholder-[#7d8590] text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#238636] text-[#f0f6fc] py-2 rounded font-medium hover:bg-[#2ea043] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1f6feb] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-xs mt-6 text-center text-[#7d8590]">
          Already have an account?{" "}
          <Link href="/admin/login" className="text-[#2f81f7] hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}