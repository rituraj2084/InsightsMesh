import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-[90%] px-4 py-3 rounded-lg shadow text-sm whitespace-pre-wrap break-words ${
        isUser
          ? 'bg-blue-500 text-white self-end ml-auto'
          : 'bg-white dark:bg-gray-700 text-black dark:text-white self-start'
      }`}
    >
      <ReactMarkdown children={message.content} />
    </motion.div>
  );
};

export default MessageBubble;
