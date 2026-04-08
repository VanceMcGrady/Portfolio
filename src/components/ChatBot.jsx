import { useState, useRef, useEffect } from 'react'

const WELCOME_MESSAGE = {
  role: 'assistant',
  text: "Hi! I'm Vance's assistant. Ask me anything about his experience, skills, or projects.",
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    setInput('')
  }

  return (
    <div className="chatbot-wrapper">
      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <span className="chatbot-title">
              <i className="fas fa-robot"></i> Ask Me Anything
            </span>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message chatbot-message--${msg.role}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-row" onSubmit={handleSubmit}>
            <input
              className="chatbot-input"
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className="chatbot-send" aria-label="Send">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}

      <button
        className={`chatbot-fab${isOpen ? ' chatbot-fab--open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'}`}></i>
      </button>
    </div>
  )
}
