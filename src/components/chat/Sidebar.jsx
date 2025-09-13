// /components/Sidebar.js
"use client";
import React from "react";
import { RefreshCw, Code2, Plus } from "lucide-react";
import Link from "next/link";

export default function Sidebar({
  history = [],
  onRefresh,
  onNewConversation,
}) {
  return (
    <div className="w-80 bg-[#161b22] border-r border-[#30363d] flex flex-col h-full">
      <div className="p-4 border-b border-[#30363d]">
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="text-[#3fb950]" size={24} />
          <h1 className="text-xl font-semibold text-[#c9d1d9]">
            AI Code Buddy
          </h1>
        </div>
        <p className="text-sm text-[#8b949e]">Your personal coding assistant</p>
      </div>

      <div className="p-4 border-b border-[#30363d] flex gap-2">
        <button
          className="flex-1 flex cursor-pointer items-center justify-center gap-2 py-2 rounded bg-[#21262d] text-[#c9d1d9] text-sm hover:bg-[#30363d] border border-[#30363d]"
          onClick={onRefresh}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
        <button
          className="flex items-center cursor-pointer justify-center gap-2 py-2 px-3 rounded bg-[#238636] text-[#c9d1d9] text-sm hover:bg-[#2ea043]"
          onClick={onNewConversation}
        >
          <Plus size={16} />
          New
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <h2 className="text-sm font-medium text-[#8b949e] mb-2">
          Conversation History
        </h2>

        {history.length === 0 ? (
          <div className="text-sm text-[#8b949e] italic">No history yet</div>
        ) : (
          <div className="space-y-2">
            {history.map((h) => (
              <div
                key={h._id}
                className="p-3 rounded cursor-pointer hover:bg-[#21262d] border border-transparent hover:border-[#30363d]"
              >
                <Link href={`/admin/chat/${h._id}`}>
                  <div className="text-sm font-medium text-[#c9d1d9] truncate">
                    {h.title}
                  </div>
                  <div className="text-xs text-[#8b949e] mt-1">
                    {new Date(h.updatedAt).toLocaleString()}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[#30363d] text-xs text-[#8b949e]">
        <div>Powered by OpenRouter</div>
        <div>Made with ❤️ for developers</div>
      </div>
    </div>
  );
}
