import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/loginForm.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://s51-gpc.onrender.com/login', {
        username,
        password,
      });

      console.log(response.data);
      document.cookie = `userToken=${response.data.token}`;

      onLogin();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        {loading && <div className="loading-spinner"></div>}
      </form>
    </div>
  );
};

export default Login;
