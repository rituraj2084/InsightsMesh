import React, { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';
import useInactivityLogout from '../hooks/useInactivityLogout';

const MainLayout = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useInactivityLogout();

  return (
    <div className="min-h-screen bg-primary text-primary transition-colors duration-300">
      <header className="flex justify-between items-center p-4 border-b border-custom">
        <h1 className="text-xl font-semibold">InsightsMesh</h1>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/import" className="hover:underline">
            Import
          </Link>

          <button
            onClick={() => dispatch(toggleTheme())}
            className="px-3 py-1 border border-custom rounded text-sm cursor-pointer hover:bg-secondary transition-colors"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
