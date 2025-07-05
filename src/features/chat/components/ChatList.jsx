import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChatList = ({ filterTag }) => {
  const sessions = useSelector((state) => state.chat.sessions);
  const navigate = useNavigate();

  const filtered = filterTag
    ? sessions.filter((s) => s.tags?.includes(filterTag))
    : sessions;

  if (!filtered.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No chat sessions found. Start a new one!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((session) => (
        <div
          key={session.id}
          onClick={() => navigate(`/chat/${session.id}`)}
          className="bg-primary text-primary rounded-xl p-6 shadow hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02]"
        >
          <h3 className="font-semibold text-lg mb-2">
            {session.title || 'Untitled Chat'}
          </h3>
          <p className="text-sm bg-primary text-primary">
            {session.summary || 'No summary available yet.'}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {session.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
