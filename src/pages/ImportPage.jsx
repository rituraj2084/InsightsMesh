import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { importSessions } from '../features/chat/chatSlice';
import { useNavigate } from 'react-router-dom';

const ImportPage = () => {
  const sessions = useSelector((state) => state.chat.sessions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleExport = () => {
    const dataStr = JSON.stringify(sessions, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'insightsmesh-chat-backup.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        dispatch(importSessions(data));
        alert('Import successful!');
        navigate('/');
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-primary">
        Import / Export Chat History
      </h2>

      <button
        onClick={handleExport}
        aria-label="Export Chats"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
      >
        📤 Export Chats
      </button>

      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          aria-label="Import Chats"
          className="border border-custom p-2 cursor-pointer bg-primary text-primary"
        />
      </div>
    </div>
  );
};

export default ImportPage;
