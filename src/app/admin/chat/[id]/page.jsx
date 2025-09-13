// /app/chat/[id]/page.js
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ChatWindow from "@/components/chat/ChatWindow";
import Sidebar from "@/components/chat/Sidebar";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadHistory() {
    try {
      const res = await fetch("/api/chat");
      const json = await res.json();
      if (json.ok) setHistory(json.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function loadConversation() {
    try {
      const res = await fetch(`/api/chat/${params.id}`);
      const json = await res.json();
      
      if (json.ok) {
        setActiveConversation(json.data);
      } else {
        console.error("Failed to load conversation:", json.error);
      }
    } catch (error) {
      console.error("Error loading conversation:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { 
    loadHistory(); 
    if (params.id) {
      loadConversation();
    } else {
      setLoading(false);
    }
  }, [params.id]);

  const handleSelectConversation = (convo) => {
    setActiveConversation(convo);
    router.push(`/admin/chat/${convo._id}`);
  };

  const handleNewConversation = () => {
    setActiveConversation(null);
    router.push('/admin/chat');
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#0d1117] text-[#c9d1d9]">
        <div className="w-80 bg-[#161b22] border-r border-[#30363d] flex flex-col h-full">
          <div className="p-4 border-b border-[#30363d]">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-xl font-semibold text-[#c9d1d9]">AI Code Buddy</h1>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-[#c9d1d9]">Loading...</div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center bg-[#0d1117]">
          <div className="text-[#c9d1d9]">Loading conversation...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0d1117] text-[#c9d1d9]">
      <Sidebar
        history={history}
        onRefresh={loadHistory}
        onSelect={handleSelectConversation}
        onNewConversation={handleNewConversation}
      />
      <ChatWindow
        initialConversation={activeConversation}
        onSaved={() => {
          loadHistory();
          if (params.id) loadConversation();
        }}
      />
    </div>
  );
}