import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import ChatPage from '../pages/ChatPage';
import ImportPage from '../pages/ImportPage';
import LoginPage from '../pages/LoginPage';
import MainLayout from '../layouts/MainLayout';
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user)
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/import" element={<ImportPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
