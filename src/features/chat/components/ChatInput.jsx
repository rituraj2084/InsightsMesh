import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../chatSlice';
import { getLLMReply } from '../../../services/llmService';

const ChatInput = ({ sessionId, setIsBotTyping }) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSend = async () => {
    if (!input.trim()) return;

    dispatch(
      addMessage({ sessionId, message: { role: 'user', content: input } })
    );
    setInput('');

    setIsBotTyping(true);

    const reply = await getLLMReply(input);
    setIsBotTyping(false);

    dispatch(
      addMessage({ sessionId, message: { role: 'bot', content: reply } })
    );
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        className="flex-1 px-4 py-2 border rounded shadow text-black dark:text-white bg-white dark:bg-gray-800"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        aria-label="Chat message input"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
