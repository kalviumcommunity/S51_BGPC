import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Entity from './Component/Entity';
import PostComponent from './Component/PostEntity';
import Navbar from './Component/NavBar';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/post" element={<PostComponent />} />
        <Route path="/" element={<Entity />} />
      </Routes>
    </Router>
  );
};

export default App;
