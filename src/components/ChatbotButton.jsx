// components/ChatbotButton.jsx
import { TbMessageChatbot } from "react-icons/tb"
import { motion } from "framer-motion"

export default function ChatbotButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <button
        className="bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 cursor-pointer transition flex items-center justify-center"
        aria-label="Open Chatbot"
      >
        <TbMessageChatbot className="w-6 h-6" />
      </button>
    </motion.div>
  )
}