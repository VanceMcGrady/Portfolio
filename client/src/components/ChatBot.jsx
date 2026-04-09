import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const WELCOME_MESSAGE = {
  role: 'assistant',
  text: "Hi! I'm Vance's assistant. Ask me anything about his experience, skills, or projects.",
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(true)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage = { role: 'user', text: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => m.role !== 'assistant' || m !== WELCOME_MESSAGE)
            .map((m) => ({ role: m.role, content: m.text })),
        }),
      })

      if (!res.ok) throw new Error(`Server error: ${res.status}`)

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }])
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
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
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message chatbot-message--assistant chatbot-message--loading">
                <span></span><span></span><span></span>
              </div>
            )}
            {error && (
              <div className="chatbot-message chatbot-message--error">{error}</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-row" onSubmit={handleSubmit}>
            <input
              className="chatbot-input"
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              className="chatbot-send"
              aria-label="Send"
              disabled={isLoading}
            >
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
