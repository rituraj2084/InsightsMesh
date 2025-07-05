import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ChatListItem = ({ session }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="border p-3 rounded-md shadow hover:shadow-md bg-white dark:bg-gray-800 cursor-pointer"
      onClick={() => navigate(`/chat/${session.id}`)}
    >
      <h3 className="font-bold text-lg">{session.title || 'Untitled Chat'}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {session.summary || 'No summary yet'}
      </p>
    </motion.div>
  );
};

export default ChatListItem;
