"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1117] p-6 text-[#f0f6fc]">
      <h1 className="text-6xl md:text-8xl font-bold text-[#1f6feb] mb-4">404</h1>
      <h2 className="text-xl md:text-2xl font-semibold mb-3 text-center">
        Page Not Found
      </h2>
      <p className="text-[#7d8590] text-center mb-6 max-w-md text-sm">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-[#21262d] text-[#f0f6fc] rounded-md hover:bg-[#30363d] transition-colors border border-[#30363d] text-sm"
        >
          <ArrowLeft size={16} /> Go Back
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-[#238636] text-[#f0f6fc] rounded-md hover:bg-[#2ea043] transition-colors text-sm"
        >
          <Home size={16} /> Home
        </Link>
      </div>
    </div>
  );
}