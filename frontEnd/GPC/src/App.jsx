import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Entity from './Component/Entity';
import PostComponent from './Component/PostEntity';
import Navbar from './Component/NavBar';
import Patch from './Component/Patch';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/post" element={<PostComponent />} />
        <Route path="/" element={<Entity />} />
        <Route path="/edit/:pc" element={<Patch />} />
      </Routes>
    </Router>
  );
};

export default App;
