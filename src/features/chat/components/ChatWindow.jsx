import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ sessionId, isBotTyping }) => {
  const session = useSelector((state) =>
    state.chat.sessions.find((s) => s.id === sessionId)
  );

  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [session?.messages, isBotTyping]);

  if (!session) return null;

  return (
    <div className="flex flex-col gap-3">
      {session.messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} />
      ))}
      {isBotTyping && (
        <div className="italic text-sm text-gray-500 bg-gray-200 dark:bg-gray-700 rounded px-3 py-1 w-fit">
          Bot is typing...
        </div>
      )}
      <div ref={endRef}></div>
    </div>
  );
};

export default ChatWindow;
