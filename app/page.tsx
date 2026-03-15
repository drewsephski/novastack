'use client'

import { useChat } from '@ai-sdk/react'
import { useState } from 'react'

export default function Chat() {
  const [input, setInput] = useState('')
  const { messages, sendMessage } = useChat({
    api: '/api/chat',
  })

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          <b>{m.role}:</b>
          {m.parts.map((part, i) =>
            part.type === 'text' ? <div key={i}>{part.text}</div> : null
          )}
        </div>
      ))}

      <form onSubmit={(e) => {
        e.preventDefault()
        if (input.trim()) {
          sendMessage({ text: input })
          setInput('')
        }
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          type="text"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
