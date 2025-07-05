import { createSlice, nanoid } from '@reduxjs/toolkit';
import { encryptData, decryptData } from '../../utils/crypto';

const STORAGE_KEY = 'chat_sessions';

const loadInitialSessions = () => {
  const encrypted = localStorage.getItem(STORAGE_KEY);
  if (!encrypted) return [];
  const data = decryptData(encrypted);
  return Array.isArray(data) ? data : [];
};

const saveSessions = (sessions) => {
  const encrypted = encryptData(sessions);
  localStorage.setItem(STORAGE_KEY, encrypted);
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    sessions: loadInitialSessions(),
    activeSessionId: null,
  },
  reducers: {
    createNewSession: (state) => {
      const newSession = {
        id: nanoid(),
        title: '',
        summary: '',
        messages: [],
        tags: [],
      };
      state.sessions.unshift(newSession);
      state.activeSessionId = newSession.id;
      saveSessions(state.sessions);
    },
    createNewSessionWithId: (state, action) => {
      const newSession = {
        id: action.payload,
        title: '',
        summary: '',
        messages: [],
        tags: [],
      };
      state.sessions.unshift(newSession);
      state.activeSessionId = newSession.id;
      saveSessions(state.sessions);
    },
    setActiveSession: (state, action) => {
      state.activeSessionId = action.payload;
    },
    addMessage: (state, action) => {
      const { sessionId, message } = action.payload;
      const session = state.sessions.find((s) => s.id === sessionId);

      if (session) {
        session.messages.push(message);

        // 🧠 Title: use first user message
        if (
          message.role === 'user' &&
          session.messages.filter((m) => m.role === 'user').length === 1 &&
          !session.title
        ) {
          session.title =
            message.content.slice(0, 30) +
            (message.content.length > 30 ? '...' : '');
        }

        // 🧠 Summary: use first bot response
        if (
          message.role === 'bot' &&
          session.messages.filter((m) => m.role === 'bot').length === 1 &&
          !session.summary
        ) {
          session.summary =
            message.content.slice(0, 100) +
            (message.content.length > 100 ? '...' : '');
        }

        saveSessions(state.sessions);
      }
    },
    updateSessionMetadata: (state, action) => {
      const { sessionId, title, summary } = action.payload;
      const session = state.sessions.find((s) => s.id === sessionId);
      if (session) {
        session.title = title;
        session.summary = summary;
        saveSessions(state.sessions);
      }
    },
    setTags: (state, action) => {
      const { sessionId, tags } = action.payload;
      const session = state.sessions.find((s) => s.id === sessionId);
      if (session) {
        session.tags = tags;
        saveSessions(state.sessions);
      }
    },
    deleteSession: (state, action) => {
      const id = action.payload;
      state.sessions = state.sessions.filter((s) => s.id !== id);
      if (state.activeSessionId === id) {
        state.activeSessionId = null;
      }
      saveSessions(state.sessions);
    },
    importSessions: (state, action) => {
      const imported = action.payload;
      if (Array.isArray(imported)) {
        state.sessions = imported;
        state.activeSessionId = null;
        saveSessions(state.sessions);
      }
    },
  },
});

export const {
  createNewSession,
  createNewSessionWithId,
  setActiveSession,
  addMessage,
  updateSessionMetadata,
  setTags,
  deleteSession,
  importSessions,
} = chatSlice.actions;
export default chatSlice.reducer;
