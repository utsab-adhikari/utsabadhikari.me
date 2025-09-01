"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      return;
    } else if (status === "authenticated" || session) {
      toast.error("Already Signed In");
      router.push("/");
    }
  }, [session, status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1117] p-4 sm:p-6">
      <div className="w-full max-w-md p-6 bg-[#161b22] border border-[#30363d] rounded-md">
        <h2 className="text-xl font-semibold text-[#f0f6fc] mb-4 text-center">
          Admin Login
        </h2>
        <p className="text-xs text-center mb-5 text-[#da3633] font-medium">
          ⚠️ This portal is for <span className="font-bold">Admin use only</span>.  
          Do not attempt to log in if you are not an admin.  
          Unauthorized credentials may be misused or compromised.
        </p>

        {error && (
          <p className="bg-[#da3633]/20 text-[#f0f6fc] p-2 rounded text-sm mb-4 text-center border border-[#da3633]">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#f0f6fc] mb-1"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#f0f6fc] mb-1"
            >
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
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#238636] text-[#f0f6fc] py-2 rounded font-medium hover:bg-[#2ea043] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1f6feb] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-xs mt-6 text-center text-[#7d8590]">
          Need an account?{" "}
          <Link
            href="/admin/signup"
            className="text-[#2f81f7] hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}