// /app/page.js
"use client";
import ChatWindow from "@/components/chat/ChatWindow";
import Sidebar from "@/components/chat/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [history, setHistory] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const router = useRouter();

  async function loadHistory() {
    try {
      const res = await fetch("/api/chat");
      const json = await res.json();
      if (json.ok) setHistory(json.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => { 
    loadHistory(); 
  }, []);

  const handleSelectConversation = (convo) => {
    setActiveConversation(convo);
    router.push(`/admin/chat/${convo._id}`);
  };

  const handleNewConversation = () => {
    setActiveConversation(null);
    router.push('/admin/chat');
  };

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
        onSaved={() => loadHistory()}
      />
    </div>
  );
}