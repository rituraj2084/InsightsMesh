import React from 'react';
import { useDispatch } from 'react-redux';
import { createNewSession, createNewSessionWithId } from '../chatSlice';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

const NewChatButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewChat = () => {
    const newId = nanoid(); // generate the ID locally
    dispatch(createNewSessionWithId(newId));
    navigate(`/chat/${newId}`);
  };

  return (
    <button
      onClick={handleNewChat}
      aria-label="New Chat"
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg text-sm font-medium z-20 cursor-pointer"
    >
      + New Chat
    </button>
  );
};

export default NewChatButton;
