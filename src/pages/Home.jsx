import React, { useState } from 'react';
import ChatList from '../features/chat/components/ChatList';
import TagFilterBar from '../features/chat/components/TagFilterBar';
import NewChatButton from '../features/chat/components/NewChatButton';

const Home = () => {
  const [filterTag, setFilterTag] = useState('');

  return (
    <div className="min-h-screen px-4 py-10 bg-secondary text-primary">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-2">InsightsMesh</h1>
        <p className="text-lg text-secondary mb-10">
          All your chats in one platform!
        </p>

        {/* Filter */}
        <TagFilterBar onFilter={setFilterTag} />
        <ChatList filterTag={filterTag} />
        <NewChatButton />
      </div>
    </div>
  );
};

export default Home;
