import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim()) return;
    dispatch(login(username.trim()));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary text-primary">
      <div className="bg-primary p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Enter username"
          className="w-full p-2 mb-4 border border-custom rounded text-primary bg-secondary"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleLogin();
          }}
          aria-label="Username input"
          aria-required="true"
        />
        <button
          onClick={handleLogin}
          aria-label="Login"
          disabled={!username.trim()}
          className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
