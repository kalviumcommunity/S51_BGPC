import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Entity from './Component/Entity';
import PostComponent from './Component/PostEntity';
import Navbar from './Component/NavBar';
import Patch from './Component/Patch';
import Login from './Component/LoginForm'; 
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Navbar onLogout={handleLogout} />
          <Routes>
            <Route path="/post" element={<PostComponent />} />
            <Route path="/" element={<Entity />} />
            <Route path="/edit/:pc" element={<Patch />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
