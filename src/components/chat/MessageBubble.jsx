// /components/MessageBubble.js
"use client";
import React from "react";
import { Bot, User } from "lucide-react";

export default function MessageBubble({ role, content }) {
  const isUser = role === "user";
  const isAssistant = role === "assistant";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[85%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        } items-start gap-2`}
      >
        <div
          className={`rounded-full p-2 ${
            isUser ? "bg-[#1f6feb]" : "bg-[#30363d]"
          }`}
        >
          {isUser ? (
            <User size={16} className="text-white" />
          ) : (
            <Bot size={16} className="text-white" />
          )}
        </div>

        <div
          className={`p-3 rounded-md ${
            isUser ? "bg-[#0c2d6b] text-white" : "bg-[#21262d] text-[#c9d1d9]"
          }`}
        >
          <div className="text-sm whitespace-pre-wrap">{content}</div>
        </div>
      </div>
    </div>
  );
}
