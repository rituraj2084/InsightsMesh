import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppRouter from './routes/AppRouter';

const App = () => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <AppRouter />
    </div>
  );
};

export default App;
