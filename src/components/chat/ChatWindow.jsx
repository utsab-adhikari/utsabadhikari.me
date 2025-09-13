// /components/ChatWindow.js
"use client";
import React, { useEffect, useState, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { useRouter } from "next/navigation";

export default function ChatWindow({ initialConversation = null, onSaved }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationTitle, setConversationTitle] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const bottomRef = useRef();
  const router = useRouter();

  useEffect(() => {
    if (initialConversation) {
      setMessages(initialConversation.messages || []);
      setConversationTitle(initialConversation.title);
      setConversationId(initialConversation._id);
    } else {
      setMessages([]);
      setConversationTitle("");
      setConversationId(null);
    }
  }, [initialConversation]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(e) {
    e?.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const title = conversationTitle || userMsg.content.slice(0, 60);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          conversationId, 
          title, 
          messages: newMessages 
        }),
      });
      
      const json = await res.json();
      
      if (json.ok && json.data) {
        setMessages(json.data.messages);
        setConversationTitle(json.data.title);
        setConversationId(json.data._id);
        
        // Update URL if this is a new conversation
        if (!conversationId) {
          router.push(`/admin/chat/${json.data._id}`);
        }
        
        if (onSaved) onSaved();
      } else {
        throw new Error(json.error || "AI error");
      }
    } catch (err) {
      setMessages([...newMessages, { 
        role: "assistant", 
        content: `Error: ${err.message}. Please try again.` 
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-[#30363d] flex items-center gap-4">
        <input
          className="flex-1 bg-[#0d1117] text-[#c9d1d9] p-2 rounded border border-[#30363d] focus:border-[#3f51b5] focus:outline-none"
          placeholder="Conversation title"
          value={conversationTitle}
          onChange={(e) => setConversationTitle(e.target.value)}
        />
        {conversationId && (
          <button
            onClick={() => navigator.clipboard.writeText(
              `${window.location.origin}/chat/${conversationId}`
            )}
            className="px-3 py-2 bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] text-sm rounded"
          >
            Copy Link
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0d1117]">
        {messages.length === 0 && (
          <div className="text-center text-[#8b949e] mt-8">
            <h3 className="text-xl font-semibold mb-2">AI Code Assistant</h3>
            <p>Ask about code, debugging, or request a refactor...</p>
          </div>
        )}
        
        {messages.map((m, idx) => (
          <MessageBubble key={idx} role={m.role} content={m.content} />
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#21262d] p-3 rounded-md max-w-[85%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#c9d1d9] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-[#c9d1d9] animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 rounded-full bg-[#c9d1d9] animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-[#30363d]">
        <form onSubmit={handleSend} className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about code, debugging, or request a refactor..."
            className="flex-1 resize-none h-16 bg-[#0d1117] text-[#c9d1d9] p-3 rounded border border-[#30363d] focus:border-[#3f51b5] focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
            <button
              type="button"
              onClick={() => {
                setMessages([]);
                setConversationTitle("");
                setConversationId(null);
                router.push('/admin/chat');
              }}
              className="px-4 py-2 bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] text-sm rounded"
            >
              New Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}