"use client";

import { useState, useRef, useEffect } from "react";
import { FiMessageCircle, FiX, FiSend, FiUser, FiCpu, FiLink, FiExternalLink } from "react-icons/fi";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
      } else {
        throw new Error("Failed to get response");
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Rich link preview component
  const LinkPreview = ({ url }) => {
    const [metadata, setMetadata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      const fetchMetadata = async () => {
        try {
          setLoading(true);
          const res = await fetch("/api/metadata", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
          });
          
          if (res.ok) {
            const data = await res.json();
            setMetadata(data);
          } else {
            setError(true);
          }
        } catch (err) {
          console.error("Error fetching metadata:", err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      
      fetchMetadata();
    }, [url]);

    if (loading) {
      return (
        <div className="mt-1 p-2 bg-[#161b22] border border-[#30363d] rounded-md flex items-center">
          <FiLink className="mr-2 text-[#8b949e]" />
          <span className="text-xs text-[#8b949e]">Loading preview...</span>
        </div>
      );
    }

    if (error || !metadata) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 text-[#58a6ff] text-xs flex items-center"
        >
          <FiExternalLink className="mr-1" />
          {url}
        </a>
      );
    }

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-2 border border-[#30363d] rounded-md overflow-hidden bg-[#161b22] hover:bg-[#21262d] transition-colors no-underline"
      >
        {metadata.image && (
          <div className="w-full h-32 overflow-hidden">
            <img 
              src={metadata.image} 
              alt={metadata.title || "Link preview"} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        <div className="p-2">
          <p className="text-sm font-semibold text-[#f0f6fc] mb-1 line-clamp-1">
            {metadata.title || "No title available"}
          </p>
          {metadata.description && (
            <p className="text-xs text-[#8b949e] line-clamp-2 mb-1">
              {metadata.description}
            </p>
          )}
          <div className="flex items-center text-xs text-[#8b949e]">
            <FiLink className="mr-1" />
            <span className="truncate">{new URL(url).hostname}</span>
          </div>
        </div>
      </a>
    );
  };

  // Detect URLs in message content and render appropriately
  const renderMessageContent = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, i) => {
      if (urlRegex.test(part)) {
        return <LinkPreview key={i} url={part} />;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 z-50 p-4 rounded-full shadow-lg transition-colors duration-300 ${
          isOpen ? "bg-[#f85149] hover:bg-[#da3633] text-white" : "bg-[#238636] hover:bg-[#2ea043] text-white"
        }`}
        aria-label="Chat with assistant"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </button>

      {/* Chat container */}
      <div
        className={`fixed bottom-20 right-2 sm:right-4 z-40 w-full max-w-full sm:max-w-md transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="bg-[#0d1117] border border-[#30363d] rounded-lg shadow-xl overflow-hidden flex flex-col h-[70vh] sm:h-[500px]">
          {/* Chat header */}
          <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#3fb950] mr-2"></div>
              <h3 className="font-semibold text-[#c9d1d9] text-sm sm:text-base">Portfolio Assistant</h3>
            </div>
            <button
              onClick={() => setMessages([])}
              className="text-xs sm:text-sm text-[#58a6ff] hover:text-[#79c0ff]"
            >
              Clear
            </button>
          </div>

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-[#0d1117]">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-[#8b949e]">
                <FiMessageCircle size={28} className="mb-2" />
                <p className="text-sm sm:text-base">Hello! I'm your portfolio assistant.</p>
                <p className="text-sm sm:text-base">How can I help you today?</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] sm:max-w-md px-3 py-2 rounded-lg ${
                        message.role === "user"
                          ? "bg-[#1f6feb] text-white"
                          : "bg-[#161b22] text-[#c9d1d9] border border-[#30363d]"
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        {message.role === "user" ? (
                          <FiUser size={14} className="mr-1" />
                        ) : (
                          <FiCpu size={14} className="mr-1" />
                        )}
                        <span className="text-xs font-medium">
                          {message.role === "user" ? "You" : "Assistant"}
                        </span>
                      </div>
                      <div className="text-sm sm:text-base break-words">
                        {renderMessageContent(message.content)}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#161b22] text-[#c9d1d9] border border-[#30363d] px-3 py-2 rounded-lg max-w-[70%] sm:max-w-md">
                      <div className="flex items-center mb-1">
                        <FiCpu size={14} className="mr-1" />
                        <span className="text-xs font-medium">Assistant</span>
                      </div>
                      <div className="flex space-x-1 mt-1">
                        <div className="w-2 h-2 bg-[#8b949e] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#8b949e] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 bg-[#8b949e] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input area */}
          <form onSubmit={handleSendMessage} className="p-2 sm:p-3 bg-[#161b22] border-t border-[#30363d] flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#58a6ff]"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="ml-2 bg-[#238636] text-white p-2 rounded-md hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiSend size={18} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}