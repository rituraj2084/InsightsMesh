import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatWindow from '../features/chat/components/ChatWindow';
import ChatInput from '../features/chat/components/ChatInput';
import TagSelector from '../features/chat/components/TagSelector';

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const session = useSelector((state) =>
    state.chat.sessions.find((s) => s.id === id)
  );
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    if (!session) navigate('/');
  }, [session]);

  return (
    <div
      className="fixed inset-0 z-50 bg-transparent backdrop-blur-md flex items-center justify-center transition-opacity duration-300"
      onClick={() => navigate('/')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-title"
    >
      <div
        className="bg-primary rounded-xl shadow-lg w-full max-w-3xl h-[80vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-custom flex justify-between items-center">
          <h2 className="text-lg font-bold text-primary">
            {session?.title || 'Chat Session'}
          </h2>
          <button
            onClick={() => navigate('/')}
            className="text-secondary hover:text-red-600 text-xl font-bold cursor-pointer"
            aria-label="Close chat"
          >
            ×
          </button>
        </div>
        <TagSelector sessionId={id} selectedTags={session?.tags || []} />

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-secondary">
          <ChatWindow sessionId={id} isBotTyping={isBotTyping} />
        </div>

        {/* Input bar */}
        <div className="border-t border-custom p-4 bg-primary">
          <ChatInput sessionId={id} setIsBotTyping={setIsBotTyping} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
