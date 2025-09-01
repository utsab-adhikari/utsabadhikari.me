'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { MessageSquare, Bot, X, Send } from 'lucide-react'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your portfolio assistant. How can I help you today?", sender: 'bot' }
  ])
  const [inputText, setInputText] = useState('')

  const handleSendMessage = () => {
    if (inputText.trim() === '') return
    
    // Add user message
    setMessages([...messages, { id: messages.length + 1, text: inputText, sender: 'user' }])
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: prev.length + 1, text: "I'm a simple demo chatbot. In a real implementation, I would connect to an AI service like OpenAI.", sender: 'bot' }
      ])
    }, 1000)
    
    setInputText('')
  }

  return (
    <section id="chatbot" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <MessageSquare className="mr-2" /> Interactive Chatbot
      </h2>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        This AI-powered chatbot can answer questions about my skills, experience, and projects. 
        Try asking about my tech stack or previous work!
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium"
      >
        <Bot size={18} className="mr-2" />
        Open Chat Assistant
      </motion.button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center">
                <Bot size={20} className="mr-2" />
                <h3 className="font-semibold">Portfolio Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-l-lg py-2 px-4 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg px-4"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}